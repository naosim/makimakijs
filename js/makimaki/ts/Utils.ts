module makimaki.utils {
  export class DLog {
    static dlogInstance: DLog;
    static getInstance() {
      if(!DLog.dlogInstance) DLog.dlogInstance = new DLog();
      return DLog.dlogInstance;
    }

    actions: {(...obj: any[]):void}[];

    addAction(action: (...obj: any[])=>void) {
      this.actions = this.actions || [];
      this.actions.push(action);
    }

    log() {
      console.log(arguments);
      this.actions.forEach((action: (...obj: any[])=>void) => {
        action(arguments);
      });
    }


  }

  export var dlog = DLog.getInstance();
}
