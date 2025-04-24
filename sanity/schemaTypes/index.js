import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { subscriptionType } from "./subscriptionType";
import { bookingType } from "./bookingType";
import { serviceType } from "./serviceType";
import { discountCodeType } from "./discountCodeType";

export const schema = {
  types: [
    authorType,
    blockContentType,
    categoryType,
    postType,
    subscriptionType,
    bookingType,
    serviceType,
    discountCodeType,
  ],
};

export default {
  name: "schemaTypes",
  types: [bookingType, serviceType, discountCodeType],
};
