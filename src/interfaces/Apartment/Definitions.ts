import { ReservationModel } from "../Reservation.ts/Definitions";

export interface ApartmentModel {
  id: string;
  name: string;
  address: Address;
  facilities: Facility[];
  capacity: capacity;
  price: number;
  images: string[];
  detailsHU: string;
  detailsEN: string;
  plusPrice: number;
  reviews: Review[];
  reservations: ReservationModel[];
}

export interface Address {
  zip_code: string;
  city: string;
  street: string;
  house_number: string;
}

export interface Facility {
  nameEN: string;
  nameHU: string;
  url: string;
}

export interface capacity {
  capacity: number;
  bedrooms: number;
}

export interface Review {
  customer: string;
  review: string;
  stars: number;
  timeAgo: Date;
}
