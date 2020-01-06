# Restaurants App

## Introduction

This app has the ability to upload restaurants from csv with the following props: name, type, phone, location.
Name is defined as unique so uploading of the same restaurants twice won't duplicate data - just update the current row
The list of restaurants can be filtered, updated or deleted.

## Host

This app is hosted @ https://ancient-shore-54564.herokuapp.com/restaurants

## Architecture

- server: Go + gin
- client: reactJS
- db: postgress
