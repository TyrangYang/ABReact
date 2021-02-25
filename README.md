# ABReact (awesome-bill-recorder in react)

## Introduction

This is a bill recording web application developed using ReactJs. It can come in handy when you want to record daily spending with friends and split the bills.

## Design

Currently it is a single-page application, and there are 3 components each taking care of a block of functionalities. Adding/Deleting users and displaying their names are handled by the User component. Adding a new bill and displaying/sorting bills is happening in the Bill component. Summary component is responsible for summing up who owes who how much money.
Since it's purely frontend for now, our main data is currently saved only in parent component and all child components are passing data to the parent.

## Dependencies used

1. [Dinero.js](https://dinerojs.com/) to help in handling currency and format
2. [Moment.js](https://momentjs.com/) for date recording and formatting

## Features

1. Add, remove and view users
2. Add new bill entry with payer, total amount and list of participants.
    - Payer and participants can only be selected from existing users.
    - Date can either be included or left out. If choose to include, date is editable and default to today.
    - Total amount can either be split evenly or unevenly. Default is evenly split. If choose unevenly split, can edit amount for each participant.
3. View list of bills. Bills can be sorted by Payer name, amount or date. Bill entries without date are placed to the end of the list if choose to sort by date.
4. View list of summaries that sum up the bill entries and display who owes who how much money.
    - Summaries can be sorted by payer name, receiver name or amount.
    - Summaries can be merged so that users can pay up more conveniently.
    - Each summary can be settled and removed from the list

## Future Plans
