import { makeAutoObservable, makeObservable, observable } from "mobx";

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


  async populateStore() {
    const courses = await this.getCourses();

    // TODO:  potential risk async // await */
    this.courseNames = courses;
    console.log(courses);

    const id = courses[0].courseid;
    const days = await this.getDays(id);
    this.course.title = courses[0].name;
    this.course.courseid = courses[0].id;
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
    console.log(tempDays)

      /* TODO get comments */
  }

  async changeStore(name) {
    console.log('start');
    let id;
    this.courseNames.forEach(element => {
      console.log("searching courses" + name + " " + element.name)
      if (Object.values(element).includes(name)) {
        console.log("found course in coursenames " + element.name);
        id = element.courseid;
        this.course.courseid = element.id;
        this.course.title = element.name;
      }})

    const days = await this.getDays(id);

    this.course.title = name;
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
      fetch(`http://localhost:5000/CreateCard`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }catch (e) {
      console.log("error: " + e);
    }

    //TODO: update the store cards since new one is in db
    //this.course.tabs[dayName].threads = this.getCards(this.course.tabs[dayName].dayid);

  }

  async getComments(id) {
    try {
      const res = await fetch(`http://localhost:5000/getCommentsForOneCard/${id}`)
      const parsed = await res.json();
      return parsed;
    } catch (error) {
      console.log("shits on fire comments");
    }
  }

  async getCards(id) {
    try {
      const res = await fetch(`http://localhost:5000/GetCardsFromdDay/${id}`)
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log("shits on fire cards");
    }
  }

  async getDays(id) {
    try {
      const res = await fetch(`http://localhost:5000/getDaysForCourse/${id}`)
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log("shits on fire days");
    }
  }

  async getCourse(id) {
    try {
      const res = await fetch(`http://localhost:5000/getOneCourse/${id}`)
      const parsed = await res.json();
      console.log(parsed);
      return parsed;
    } catch (error) {
      console.log("shits on fire");
    }
  }

  async getCourses() {
    try {
      const res = await fetch("http://localhost:5000/allCourses");
      const parsed = await res.json();
      return parsed; 
    } catch (error) {
      
    }
  }

  constructor() {
    makeAutoObservable(this, {}, {
    autoBind: true,
  })
  }

  
}


