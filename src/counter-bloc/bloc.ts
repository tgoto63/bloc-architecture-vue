import { BehaviorSubject, Observable } from "rxjs";
import { CounterState } from "@/counter-bloc/state";
import { EventType } from "@/counter-bloc/event";

export class CounterBloc {
  private subject = new BehaviorSubject<CounterState>({
    loading: false,
    counter: 0
  });

  get stream(): Observable<CounterState> {
    return this.subject.asObservable();
  }

  async sink(event: EventType) {
    const nextState: CounterState = this.subject.value;

    switch (event.type) {
      case "increment":
        nextState.counter += event.count;
        break;

      case "decrement":
        nextState.counter -= event.count;
        break;

      case "async-increment":
        nextState.loading = true;

        this.fetchMock(2000).then(() => {
          this.sink({
            type: "async-finish",
            nextSink: "increment",
            count: event.count
          });
        });
        break;

      case "async-decrement":
        nextState.loading = true;

        this.fetchMock(2000).then(() => {
          this.sink({
            type: "async-finish",
            nextSink: "decrement",
            count: event.count
          });
        });
        break;

      case "async-finish":
        nextState.loading = false;
        this.sink({ type: event.nextSink, count: event.count });
        break;

      default:
        throw new Error(`unexpected event. [${JSON.stringify(event)}]`);
    }

    this.subject.next(nextState);
  }

  private fetchMock = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));
}
