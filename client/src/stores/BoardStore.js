import { json } from "express";
import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export default class BoardStore {
  
  /* placeholder data */
  course = {
    title: "devops",
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
  constructor() {
    makeObservable(this, {
		course : observable,
	})
  }  

  
}

