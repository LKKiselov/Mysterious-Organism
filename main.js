// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // cause mutation logging the index of the mutation and the old / new state
    mutate(dna) {
      let i = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();

      while (this.dna[i] === newBase) {
        newBase = returnRandBase();
      }

      return `Gene ${i} - ${this.dna[i]} mutated to ${(this.dna[i] = newBase)}`;
    },
    compareDNA(pAequor) {
      let dnaMatch = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) dnaMatch++;
      }
      dnaMatch = Math.floor((dnaMatch / this.dna.length) * 100);
      return console.log(
        `DNA of Specimen Number #${specimenNum} \n${dna} \nDNA of Specimen Number #${pAequor.specimenNum} \n${pAequor.dna} have ${dnaMatch}% matching DNA`
      );
    },
    // calculate survival chance
    willLikelySurvive() {
      let goodDNA = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") goodDNA++;
      }
      goodDNA = Math.floor((goodDNA / this.dna.length) * 100);
      return goodDNA >= 60 ? true : false;
    },
  };
};

const survivorPool = () => {
  const survivorsPool = [];
  let i = 1;
  let generate = pAequorFactory(i, mockUpStrand());
  while (i <= 30) {
    generate = pAequorFactory(i, mockUpStrand());
    if (generate.willLikelySurvive() === true) {
      survivorsPool.push(`${i} - ${generate.dna}`);
      i++;
    }
  }
  return survivorsPool;
};

const genStrand = pAequorFactory(1, mockUpStrand());
const genStrandTwo = pAequorFactory(2, mockUpStrand());
// console.log(genStrand);
// cause mutation logging the index of the mutation and the old / new state
console.log(genStrand.mutate());
// compare Strands
console.log(genStrand.compareDNA(genStrandTwo));
// Check survival chance
console.log(genStrand.willLikelySurvive(1, mockUpStrand()));
// Survivor pool
console.log(survivorPool());
