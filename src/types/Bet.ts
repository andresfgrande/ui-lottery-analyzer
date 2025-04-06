export interface Bet {
  betId: string;
  creationDate: string;
  previousResults: string[];
  betNumbers: BetNumbersPrimitives;
  stats: StatsPrimitives;
  guesses: GuessesPrimitives;
}

export interface BetNumbersPrimitives {
  betNumberPairs: NumberPairListPrimitives[];
}

export interface StatsPrimitives {
  statsCollection: NumberCountListPrimitives[];
}

export interface NumberCountListPrimitives {
  numberCounts: NumberCountPrimitves[];
}

export interface NumberPairListPrimitives {
  pairList: string[];
}

export interface NumberCountPrimitves {
  numberPair: string;
  count: number;
}


export interface GuessesPrimitives {
  guessList: string[];
}
