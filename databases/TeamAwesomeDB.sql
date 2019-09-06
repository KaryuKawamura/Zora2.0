CREATE TABLE UsersTable
(
  "id" serial primary key,
  "name" varchar,
  "password" varchar,
  "horoscope" varchar
);

CREATE TABLE fashionStyles
(
  "userstable_id" int,
  "style_id" int,
  "gender_id" int
);

CREATE TABLE clothesMale
(
  "clothes_id" serial primary key,
  "name" VARCHAR(255),
  "style_id" int,
  "type_id" int,
  "gender_id" int,
  "price" varchar,
  "img" varchar
);

CREATE TABLE clothesFemale
(
  "clothes_id" serial primary key,
  "name" VARCHAR,
  "style_id" int,
  "type_id" int,
  "gender_id" int,
  "price" VARCHAR,
  "img" varchar
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
  "price" int
);

CREATE TABLE purchase
(
  "userstable_id" int,
  "cart_id" int,
  "transaction_id" serial primary key,
  "created_at" timestamp
);

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("userstable_id") REFERENCES "userstable" ("id");

ALTER TABLE "clothesFemale" ADD FOREIGN KEY ("style_id") REFERENCES "fashionStyles" ("style_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("gender_id") REFERENCES "clothesFemale" ("gender_id");

ALTER TABLE "userstable" ADD FOREIGN KEY ("id") REFERENCES "cart" ("userstable_id");

ALTER TABLE "clothesFemale" ADD FOREIGN KEY ("clothes_id") REFERENCES "cart" ("clothes_id");

ALTER TABLE "clothesFemale" ADD FOREIGN KEY ("price") REFERENCES "cart" ("price");

ALTER TABLE "userstable" ADD FOREIGN KEY ("id") REFERENCES "purchase" ("userstable_id");

ALTER TABLE "purchase" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("cart_id");

ALTER TABLE "clothesFemale" ADD FOREIGN KEY ("type_id") REFERENCES "type" ("id");

ALTER TABLE "type" ADD FOREIGN KEY ("clothes_id") REFERENCES "clothesMale" ("clothes_id");

ALTER TABLE "type" ADD FOREIGN KEY ("id") REFERENCES "clothesMale" ("type_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("gender_id") REFERENCES "clothesMale" ("gender_id");

ALTER TABLE "fashionStyles" ADD FOREIGN KEY ("style_id") REFERENCES "clothesMale" ("style_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("price") REFERENCES "clothesMale" ("price");

ALTER TABLE "cart" ADD FOREIGN KEY ("clothes_id") REFERENCES "clothesMale" ("clothes_id");