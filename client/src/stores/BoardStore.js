import { makeObservable, observable } from "mobx";

export default class BoardStore {
  content = [
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

  constructor() {
    makeObservable(this, {
      content: observable,
    });
  }
}
