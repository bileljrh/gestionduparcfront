export interface ListSousFamille {
  nomSousFamille: string;
  codeSousFamille: string;
}

export interface ListFamilleAndSousFamille {
  famille: string;
  codeFamille: string;
  sousFamille: ListSousFamille[];
}
