export type Cat = {
  id?: string; // to-do: make mandatory
  name: string;
  color: string;
  sex: string;
  birth?: string;
  tripleFeline?: boolean;
  tripleFelineDate?: string;
  rabies?: boolean;
  rabiesDate?: string;
  VLFe?: boolean;
  VLFeDate?: string;
  dewormed?: boolean;
  dewormedDate?: string;
};

export enum Vaccine {
  RABIES = "rabies",
  TRIPLE_FELINE = "tripleFeline",
  VLFe = "VLFe",
  DEWORMED = "dewormed",
}

export enum Periodicity {
  MONTHLY = "monthly",
  ANNUAL = "annual",
}

export function getVaccinePeriodicity(vaccine: Vaccine): Periodicity {
  switch (vaccine) {
    case Vaccine.DEWORMED:
      return Periodicity.MONTHLY;
    case Vaccine.RABIES:
    case Vaccine.TRIPLE_FELINE:
    case Vaccine.VLFe:
      return Periodicity.ANNUAL;
  }
}
