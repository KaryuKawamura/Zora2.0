CREATE TABLE userstable
(
  "id" serial primary key,
  "name" varchar,
  "password" varchar,
  "horoscope" varchar
);

CREATE TABLE horoscope
(
  "id" serial primary key,
  "horoscope" varchar
);

CREATE TABLE fashionStyles
(
  "userstable_id" int,
  "style_id" int,
  "gender_id" int
);

CREATE TABLE clothes
(
  "clothes_id" serial primary key,
  "name" VARCHAR(255),
  "style_id" int,
  "type_id" int,
  "gender_id" int,
  "price" varchar,
  "img" varchar,
  "horoscope_id" varchar
);


CREATE TABLE type
(
  "clothes_id" int,
  "type_id" int,
  "typeName" varchar
);

CREATE TABLE cart
(
  "cart_id" int,
  "userstable_id" int,
  "clothes_id" int,
  "price" varchar,
  "quantity" int,
  "size" varchar
);

CREATE TABLE purchase
(
  "userstable_id" int,
  "cart_id" int,
  "transaction_id" serial primary key,
  "created_at" timestamp
);

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("userstable_id") REFERENCES "userstable" ("id");

ALTER TABLE "clothes" ADD FOREIGN KEY ("style_id") REFERENCES "fashionStyles" ("style_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("gender_id") REFERENCES "clothes" ("gender_id");

ALTER TABLE "userstable" ADD FOREIGN KEY ("id") REFERENCES "cart" ("userstable_id");

ALTER TABLE "clothes" ADD FOREIGN KEY ("clothes_id") REFERENCES "cart" ("clothes_id");

ALTER TABLE "clothes" ADD FOREIGN KEY ("price") REFERENCES "cart" ("price");

ALTER TABLE "userstable" ADD FOREIGN KEY ("id") REFERENCES "purchase" ("userstable_id");

ALTER TABLE "purchase" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id");

ALTER TABLE "clothes" ADD FOREIGN KEY ("type_id") REFERENCES "type" ("id");

ALTER TABLE "type" ADD FOREIGN KEY ("clothes_id") REFERENCES "clothes" ("clothes_id");

ALTER TABLE "type" ADD FOREIGN KEY ("id") REFERENCES "clothes" ("type_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("gender_id") REFERENCES "clothes" ("gender_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("style_id") REFERENCES "clothes" ("style_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("price") REFERENCES "clothes" ("price");

-- new alter table commands:

ALTER TABLE "cart" ADD FOREIGN KEY ("clothes_id") REFERENCES "clothes" ("clothes_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("cart_id") REFERENCES "purchase" ("clothes_id");

ALTER TABLE "purchase" ADD FOREIGN KEY ("userstable_id") REFERENCES "purchase" ("userstable_id");