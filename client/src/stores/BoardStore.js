import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export default class BoardStore {
  
  /* placeholder data */
  course = {
    title: "Yeet",
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

  courseNames = []

  count = {
    count: {
      count: {
        count: 0
      }
    }
  }

  updateCount = () => {
    this.count.count.count.count += 1;
  }

  async populateStore() {
    const courses = await this.getCourses();

    // TODO:  potential risk async // await */
    this.courseNames = courses;
    console.log(courses);
    const id = courses[0].courseid;
    const days = await this.getDays(id);

    runInAction(() => {
      this.course.title = courses[0].name;
    })
    
    
    let temp = {};

    for (const day of days) {
      const content = await this.getCards(day.dayid);
      temp[day.name] = {threads: content };
    }

    runInAction(() => {
    this.course.tabs = temp;

    });

      /* TODO get comments */
  }

  async changeStore(name) {
    console.log('start');
    let id;
    this.courseNames.forEach(element => {
      console.log(name + element.name)
      if (Object.values(element).includes(name)) {
        console.log("hello two electic boogalu")
        id = element.courseid;
        
      }})

    const days = await this.getDays(id);

    runInAction(() => {
      this.course.title = name;
    })
    
    let temp = {};

    for (const day of days) {
      const content = await this.getCards(day.dayid);
      temp[day.name] = {threads: content };
    }

    runInAction(()=> {
      this.course.tabs = temp;

    })

    console.log(); 


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
    makeAutoObservable(this)
  }

  
}


