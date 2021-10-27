import { observable } from "mobx";
import { ITurn } from "../interfaces/ITurn";

export class PaperStore {
  @observable paperStore: Array<ITurn> = [
        { id: 11, value: "" },
        { id: 12, value: "" },
        { id: 13, value: "" },
        { id: 21, value: "" },
        { id: 22, value: "" },
        { id: 23, value: "" },
        { id: 31, value: "" },
        { id: 32, value: "" },
        { id: 33, value: "" },
      ];
}