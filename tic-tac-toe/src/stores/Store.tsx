import { observable } from "mobx";
import { PaperStore } from "./PaperStore";
import { PlayerStore } from "./PlayerStore";

export default class Store {
  @observable playerStore: PlayerStore;
  @observable paperStore: PaperStore;

  constructor() {
    this.playerStore = new PlayerStore();
    this.paperStore = new PaperStore();
  }
}