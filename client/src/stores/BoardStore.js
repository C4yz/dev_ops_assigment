import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";

export default class BoardStore {
  
  devops = [
    {
      title: "titel1",
      desc: "beskrivelse2",
      author: "Jacob Berg Eriksen",
      date: "lige nu",
    },
    {
      title: "Hjælp til opgave 3",
      desc: "Har svært ved at se den røde tråd",
      author: "Thomas Hohnen",
      date: "Når helvede fryser til",
    },
    {
      title: "Just Chatting",
      desc: "Nogen der har tænkt på at bruge python?",
      author: "Daniel Styrbæk",
      date: "I morgen",
    },
  ];


  innovationpilot = [
    {
      title: "Forstår i heller ikke det her kursus?",
      desc: "beskrivelse2",
      author: "Jacob Berg Eriksen",
      date: "lige nu",
    },
    {
      title: "Hjælp til opgave 2",
      desc: "Har svært ved at se den røde tråd",
      author: "Thomas Hohnen",
      date: "Når helvede fryser til",
    },
    {
      title: "Just Snakking",
      desc: "Nogen der har tænkt på at bruge python?",
      author: "Daniel Styrbæk",
      date: "I morgen",
    },
  ];

  content = this.devops

  changeStore(course) {
	  console.log("hej");
	  console.log(course);

	  runInAction(() => {
		if (course == "DevOps") {
			this.content = this.devops
			console.log("dobbeltjek");
		} else {
			this.content = this.innovationpilot
		}
	  })
	  this.content.push({});
	console.log(this.content);
  }

  constructor() {
    makeObservable(this, {
		content : observable,
	})
  }

  
}


