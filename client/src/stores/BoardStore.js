//import { json } from "express";
import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { useState } from "react";
import errorMessage from "../errorHandeling";

export default class BoardStore {
  
  /* placeholder data */
  course = {
    title: "Yeet",
    courseid: "lakæsjdf",
    tabs: {
      day1: {
        threads: [
          {
            describtion: "Somequestion",
            author: "Børge børgesen",
            title: "This is a quesiton",
            date: "Some date",
            comments: {
              someid: "bla",
              someotherid: "bla",
              somethirdid: "bla",
            },
          },
          {
            describtion: "Somequestion",
            author: "Børge børgesen",
            title: "This is a quesiton",
            date: "Some other date",
            comments: {
              someid: "bla",
              someotherid: "bla",
              somethirdid: "bla",
            },
          },
        ],
      },
      day2: {
        threads: [
          {
          describtion: "Dette er også et spørgsmål",
          author: "Børge børgesen",
          title: "This is a quesiton",
          date: "den niende i tredje",
          comments: {
            someid: "bla",
            someotherid: "bla",
            somethirdid: "bla",
          },
        }
        ],
      },
      day3: {threads: []},
      day4: {threads: []},
  },
  };

  courseNames = [];

  state = "empty" // "done", "pending", "error", "empty"

  async populateStore() {
    this.state = "pending"
    const courses = await this.getCourses();
    console.log(courses)
    // TODO:  potential risk async // await */
    this.courseNames = courses;
    console.log(courses);

    const id = courses[0].courseid;
    const days = await this.getDays(id);

    runInAction(() => {
      this.course.title = courses[0].name;
      this.course.courseid = courses[0].id;
      
    })
    let temp = {};

    /*for (const day of days) {
      const content = await this.getCards(day.dayid);
      temp[day.name] = {dayid: day.dayid, threads: content };
    }
    this.course.tabs = temp;*/
    let tempDays = {};

    //iterate through days
    for (const day of days) {
      //get cards of a certain day
      const cards = await this.getCards(day.dayid);
      let tempCards = [];
      //iterate through cards of certain day
      for (const card of cards) {
        //get comments of certain card
        const comments = await this.getComments(card.cardid);
        //push card with comments onto tempcards for that day
        tempCards.push({cardid: card.cardid, desc: card.desc, title: card.title,
          date: card.date, username: card.username, status: card.status, comments: comments });
        /*tempCards[card.cardid] = [{cardid: card.cardid, desc: card.desc, title: card.title,
          date: card.date, username: card.username, status: card.status, comments: comments }];*/
      }
      //push day with cards onto tempdays for this
      tempDays[day.name] = {dayid: day.dayid, threads: tempCards };
    }
    //replace store days
   
    this.course.tabs = tempDays;
    this.state = "done";
    console.log(tempDays)

  }

  async changeStore(name) {
    console.log("token", localStorage.getItem("portal-jwt-Token"));
    console.log("studentid", localStorage.getItem("studentid"));
    console.log('start');
    this.state = "pending";
    let id;
    this.courseNames.forEach(element => {
      console.log("searching courses" + name + " " + element.name)
      if (Object.values(element).includes(name)) {
        console.log("found course in coursenames " + element.name);
        id = element.courseid;
        this.course.courseid = element.id;
        this.course.title = element.name;
      }})

    if (!id) {
      console.log("No course with that name was found");
      return
    }

    const days = await this.getDays(id);

    runInAction(() => {
      this.course.title = name;
    })
    
    let temp = {};

    let tempDays = {};


    //iterate through days
    for (const day of days) {
      //get cards of a certain day
      const cards = await this.getCards(day.dayid);
      let tempCards = [];
      //iterate through cards of certain day
      for (const card of cards) {
        //get comments of certain card
        const comments = await this.getComments(card.cardid);
        //push card with comments onto tempcards for that day
        tempCards.push({cardid: card.cardid, desc: card.desc, title: card.title,
          date: card.date, username: card.username, status: card.status, comments: comments });
        /*tempCards[card.cardid] = [{cardid: card.cardid, desc: card.desc, title: card.title,
          date: card.date, username: card.username, status: card.status, comments: comments }];*/
      }
      //push day with cards onto tempdays for this
      tempDays[day.name] = {dayid: day.dayid, threads: tempCards };
    }
    //replace store days
    this.course.tabs = tempDays;
    this.state = "done";
    console.log(tempDays)
  }

  async addQuestion(dayName, title, desc, username){
    console.log("addquestion called in store")
    const data = {
      title: title,
      desc: desc,
      username: username,
      dayid: this.course.tabs[dayName].dayid,
    }
    console.log("data: " + JSON.stringify(data));
    //push to db
    try {
      console.log("trying fetch")
      fetch(`http://130.225.170.203/api/CreateCard`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => {
            if(!response.ok){
              throw Error ("Could not post the data from ther server. Status: " + response.status + " " + response.statusText)
            }
            console.log(response.json());
          })
          .then(async data => {
            console.log(data)
            console.log('Success:', data);
			await this.changeStore(this.course.title);

          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }catch (e) {
      console.log(e);
    }

    //TODO: update the store cards since new one is in db
    //this.course.tabs[dayName].threads = this.getCards(this.course.tabs[dayName].dayid);
    //reload
  }

  async moveCardToFinish(cardid, status) {
    await this.updateCardStatus(cardid, status);
    await this.changeStore(this.course.title);
  }


  async updateCardStatus(cardid, status){
    console.log("updateCardStatus called in store");
    const data = {
      cardid: cardid,
      status: status,
    };
    console.log("update status data: " + JSON.stringify(data));
    //push to db
    try {
      console.log("trying fetch")
      fetch(`http://130.225.170.203/api/UpdateCardStatus`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => {
            if(!response.ok){
              throw Error ("Could not post the data from ther server. Status: " + response.status + " " + response.statusText)
            }
            response.json()
          })
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }catch (e) {
      console.log(e);
    }
  }
  async addComment(comment, username, cardid, cardStatusBefore){
    if(cardStatusBefore == 1 ){
      console.log("cardstatus was " + cardStatusBefore + " so updating to 2");
      this.updateCardStatus(cardid, 2);
    }
    console.log("addComment called in store")
    const data = {
      comment: comment,
      username: username,
      cardid: cardid,
    };
    console.log("comment data: " + JSON.stringify(data));
    //push to db
    try {
      console.log("trying fetch")
      fetch(`http://130.225.170.203/api/CreateComment`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => {
            if(!response.ok){
              throw Error ("Could not post the data from ther server. Status: " + response.status + " " + response.statusText)
            }
            response.json()
          })
          .then(async data => {
            console.log('Success:', data);
    		await this.changeStore(this.course.title);

          })
          .catch((error) => {
            console.error( error);
          });
    }catch (e) {
      console.log(e);
    }
    //TODO: update store after updating DB
    //updating store
  }

  async getComments(id) {
    try {
      const res = await fetch(`http://130.225.170.203/api/getCommentsForOneCard/${id}`)
      if(!res.ok){
        throw Error ("Could not get the data from ther server. Status: " + res.status + " " + res.statusText)
      }
      const parsed = await res.json();
      return parsed;
    } catch (error) {
      console.log(error);
    }
  }

  async getCards(id) {
    try {
      const res = await fetch(`http://130.225.170.203/api/GetCardsFromdDay/${id}`)
      if(!res.ok){
        throw Error ("Could not get the data from ther server. Status: " + res.status + " " + res.statusText)
      }
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log(error);
    }
  }

  async getDays(id) {
    try {
      const res = await fetch(`http://130.225.170.203/api/getDaysForCourse/${id}`)
      if(!res.ok){
        throw Error ("Could not get the data from ther server. Status: " + res.status + " " + res.statusText)
      }
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log(error);
    }
  }

  async getCourse(id) {
    try {
      const res = await fetch(`http://130.225.170.203/api/getOneCourse/${id}`)
      if(!res.ok){
        throw Error ("Could not get the data from ther server. Status: " + res.status + " " + res.statusText)
      }
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log(error);
    }
  }

  async getCourses() {
    try {
      const res = await fetch("http://130.225.170.203/api/allCourses");
      if(!res.ok){
        throw Error ("Could not get the data from ther server. Status: " + res.status + " " + res.statusText)
      }
      const parsed = await res.json();
      return parsed; 
    } catch (error) {
      console.log(error)
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
  
}
