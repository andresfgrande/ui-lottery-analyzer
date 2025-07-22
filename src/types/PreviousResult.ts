export interface PreviousResultsPrimitives {
  previousResults: string[];
}

export class PreviousResult {
  resultNumber: string;

  constructor(previousResult: string) {
    this.resultNumber = previousResult;
  }

  toString(): string {
    return this.resultNumber;
  }
}

export class PreviousResults {
  private previousResultList: PreviousResult[];

  constructor(previousResults?: PreviousResult[]) {
    this.previousResultList = previousResults ? previousResults : [];
  }

  addPreviousResult(previousResult: PreviousResult): void {
    if (
      !this.previousResultList.some(
        (pr) => pr.resultNumber === previousResult.resultNumber
      )
    ) {
      this.previousResultList.push(previousResult);
    } else {
      throw new Error("Duplicate previous result");
    }
  }

  removePreviousResult(previousResult: PreviousResult): void {
    this.previousResultList = this.previousResultList.filter(
      (pr) => pr.resultNumber !== previousResult.resultNumber
    );
  }

  getPreviousResults(): PreviousResultsPrimitives {
    return {
      previousResults: this.previousResultList.map((previousResult) =>
        previousResult.toString()
      ),
    };
  }

  getLength(): number {
    return this.previousResultList.length;
  }
}
