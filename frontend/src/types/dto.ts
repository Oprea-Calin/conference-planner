import type { List } from "lodash";

type SystemVersionDto = {
  version: string;
  buildDate: string;
};
type DictionaryItem = {
  id: number;
  name: string;
  code: string;
};
type ConferenceXAtendee = {
  id: number;
  AtendeeEmail: string;
  StatusName: string;
};

type ConferenceDto = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  organizerEmail: string;

  conferenceTypeId: number;
  conferenceTypeName: string;

  categoryId: number;
  categoryName: string;

  location: {
    locationId: number;
    name: string;
    code: string;
    address: string;
    countryId: number;
    countyId: number;
    cityId: number;
    latitude: number;
    longitude: number;
  };

  speakerList: {
    conferenceSpeakerId: number;
    speakerId: number;
    name: string;
    nationality: string;
    rating: number;
    isMainSpeaker: boolean;
  }[];
  atendeesList: List<ConferenceXAtendee>;

  locationName: string;
  address: string;
  countryName: string;
  countyName: string;
  cityName: string;
  mainSpeakerName?: string;
};

type UserGroupDto = {
  userGroupId: number;
  userGroupName: string;
};

type MenuItemDto = {
  itemName: string;
  canRead: boolean;
  canWrite: boolean;
  orderNo: number | null;
};

type UserDto = {
  userId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  groups: UserGroupDto[];
  menuItems: MenuItemDto[];
};

type InitializationParamValue = string | number | boolean | Date | null;

type InitializationParamDto = {
  paramName: string;
  value: InitializationParamValue;
  type: string;
};

type AsyncCommandResult = {
  commandId: string;
  correlationId?: string;
};

type CommandExecutionError = {
  code: string;
  type: string;
  data: Record<string, unknown>;
};

export type {
  SystemVersionDto,
  UserDto,
  UserGroupDto,
  MenuItemDto,
  InitializationParamDto,
  InitializationParamValue,
  AsyncCommandResult,
  CommandExecutionError,
  DictionaryItem,
  ConferenceDto,
  ConferenceXAtendee
};
