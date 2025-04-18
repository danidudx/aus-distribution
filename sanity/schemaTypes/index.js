import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { subscriptionType } from "./subscriptionType";
import { bookingType } from "./bookingType";
import { serviceType } from "./serviceType";

export const schema = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    postType,
    subscriptionType,
    bookingType,
    serviceType,
  ],
};
