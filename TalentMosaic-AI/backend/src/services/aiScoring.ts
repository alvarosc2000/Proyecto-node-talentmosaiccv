import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

interface Candidate {
  id: number;
  resume: string;
}

export const rankCandidates = (jobDescription: string, candidates: Candidate[]) => {
  tfidf.addDocument(jobDescription);

  return candidates
    .map(candidate => {
      tfidf.addDocument(candidate.resume);
      let score = 0;
      
      tfidf.listTerms(1).forEach(term => {
        score += term.tfidf;
      });

      return { ...candidate, score };
    })
    .sort((a, b) => b.score - a.score); // Ordenamos por mayor relevancia
};
