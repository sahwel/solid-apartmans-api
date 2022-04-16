import ApiResponse from "../../models/ApiResponse";
import { ApartmentModel, Review } from "../Apartment/Definitions";

export interface ReservationCRUD {
  create: (id: string, data: CreateReservationDto) => Promise<ApiResponse>;
  getAdmin: (query: any) => Promise<ApiResponse>;
  get: () => Promise<ApiResponse>;
  getFreeTimeEnd: (id: string, query: any) => Promise<ApiResponse>;
}

export interface CreateReservationDto extends ReservationBaseModel {
  payed: boolean;
}

export interface ReservationBaseModel {
  arrive: Date;
  leave: Date;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    taxNumber?: string;
    companyName?: string;
    address: {
      country: string;
      zip_code: string;
      city: string;
      street: string;
      house_number: number;
      other: string;
    };
    numberOfAdults: number;
    numberOfKids: number;
    underTwoYear: boolean;
    babyBed: boolean;
    highChair: boolean;
    privatePerson: boolean;
  };
}

export interface ReservationModel extends ReservationBaseModel {
  apartment: ApartmentModel;
  total: Number;
  payed: boolean;
  review: Review;
}
