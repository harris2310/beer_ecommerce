CREATE TABLE `beer` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`image` text,
	`type` text,
	`in_stock` integer,
	`quantity` integer,
	`order` integer,
	FOREIGN KEY (`order`) REFERENCES `order`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cartItem` (
	`id` text PRIMARY KEY NOT NULL,
	`cart_id` integer NOT NULL,
	`beer_id` integer NOT NULL,
	FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`beer_id`) REFERENCES `beer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cart` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` integer NOT NULL,
	`date` text DEFAULT (CURRENT_DATE),
	`status` text,
	FOREIGN KEY (`customer_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
