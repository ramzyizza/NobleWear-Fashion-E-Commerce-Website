-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 03, 2023 at 10:55 PM
-- Server version: 8.0.32
-- PHP Version: 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `order_data`
--

CREATE TABLE `order_data` (
  `order_id` int NOT NULL,
  `order_date` date DEFAULT NULL,
  `transaction_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` float DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `shipper_id` int DEFAULT NULL,
  `seller_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_data`
--

CREATE TABLE `product_data` (
  `product_id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` float DEFAULT NULL,
  `discount` float DEFAULT NULL,
  `quantityAvailable` int DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currentPrice` float DEFAULT NULL,
  `size` enum('S','M','L','XL') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productColor` enum('Black','White','Grey') COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `product_id` int NOT NULL,
  `image_id` int DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_review`
--

CREATE TABLE `product_review` (
  `review_id` int NOT NULL,
  `rate` float DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seller_data`
--

CREATE TABLE `seller_data` (
  `brand_id` int NOT NULL,
  `product_brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_pass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipper_data`
--

CREATE TABLE `shipper_data` (
  `shipper_id` int NOT NULL,
  `shipper_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `user_id` int NOT NULL,
  `recipient_firstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_lastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_postal` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recipient_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE `user_data` (
  `user_id` int NOT NULL,
  `user_firstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_pass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_lastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`user_id`, `user_firstName`, `user_email`, `user_pass`, `user_lastName`) VALUES
(1, 'fariz', 'fariz@example.com', '$2a$08$auUcf4V5P.X0Oq5AQmT1nuku99NPkKDoVJgX4M4T.a2X9TOPWzs4S', 'Doe'),
(2, 'Fariz', 'Izza@example.com', '$2a$08$/tSxNs1aZCzddgH7/KFeIOA0LmmEPHvN5lrgrOCntRfOzwEqWnkIW', 'Izza');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order_data`
--
ALTER TABLE `order_data`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `shipper_id` (`shipper_id`),
  ADD KEY `seller_id` (`seller_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_data`
--
ALTER TABLE `product_data`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `image_id` (`image_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_review`
--
ALTER TABLE `product_review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `seller_data`
--
ALTER TABLE `seller_data`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `shipper_data`
--
ALTER TABLE `shipper_data`
  ADD PRIMARY KEY (`shipper_id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product_data`
--
ALTER TABLE `product_data`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_review`
--
ALTER TABLE `product_review`
  MODIFY `review_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `seller_data`
--
ALTER TABLE `seller_data`
  MODIFY `brand_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipper_data`
--
ALTER TABLE `shipper_data`
  MODIFY `shipper_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_data`
--
ALTER TABLE `user_data`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_data`
--
ALTER TABLE `order_data`
  ADD CONSTRAINT `order_data_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_data` (`product_id`),
  ADD CONSTRAINT `order_data_ibfk_2` FOREIGN KEY (`shipper_id`) REFERENCES `shipper_data` (`shipper_id`),
  ADD CONSTRAINT `order_data_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `seller_data` (`brand_id`),
  ADD CONSTRAINT `order_data_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_data` (`product_id`);

--
-- Constraints for table `product_review`
--
ALTER TABLE `product_review`
  ADD CONSTRAINT `product_review_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product_data` (`product_id`),
  ADD CONSTRAINT `product_review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `user_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
