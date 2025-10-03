export interface Conference {
  id: number;
  conferenceTypeName: string;
  locationName: string;
  startDate: Date;
  endDate: string;
  mainSpeakerName: string;
  attendeesList: string[];
  name: string;
  country: string;
}

export const mockData: Conference[] = [
  {
    id: 1,
    conferenceTypeName: "remote",
    locationName: "Polish Cow Street 22, Varsovia, Polonia",
    startDate: "28/01/2026",
    endDate: " 31/01/2026",
    mainSpeakerName: "John Lemon",
    attendeesList: [
      "marius",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai",
      "marian",
      "mihai"
    ],
    name: "Real conference",
    country: "Romania"
  },
  {
    id: 2,
    conferenceTypeName: "remote",
    locationName: "Pole Street, London, England",
    startDate: "20/01/2026",
    endDate: " 22/01/2026",
    mainSpeakerName: "John Lemon",
    attendeesList: ["marius", "marian", "mihai", "marinica"],
    name: "Fake conference",
    country: "Romania"
  },
  {
    id: 3,
    conferenceTypeName: "atLocation",
    locationName: "Cow Street 22, Varsovia, Polonia",
    startDate: "28/01/2026",
    endDate: " 31/01/2026",
    mainSpeakerName: "Mihai Lemon",
    attendeesList: ["marius", "marian", "mihai"],
    name: "Conference about something",
    country: "Romania"
  },
  {
    id: 4,
    conferenceTypeName: "atLocation",
    locationName: "Street 22, Chisinau, Moldova",
    startDate: "28/01/2026",
    endDate: " 31/01/2026",
    mainSpeakerName: "Marian Lemon",
    attendeesList: ["marius", "marian", "mihai"],
    name: "Conference about nothing",
    country: "Romania"
  },
  {
    id: 5,
    conferenceTypeName: "atLocation",
    locationName: "Street 1, Bucharest, Romania",
    startDate: "28/01/2026",
    endDate: " 31/01/2026",
    mainSpeakerName: "Marius Lemon",
    attendeesList: ["marius", "marian", "mihai"],
    name: "Conference of conferences",
    country: "Romania"
  }
];
