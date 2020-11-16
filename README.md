<h1 align="center">Welcome to The Pizza Parlour API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://opensource.org/licenses/MIT" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A Fast API that enables users to order some yummy 😋😋 pizza!

### ✨ [Demo](maybe?)

## Install

```sh
See setup.md
```

## Run API
```sh
export PYTHONPATH=. &&  python api/app.py 
```

## Run Frontend

```sh
cd frontend/
npm install
npm start
```

Note: To use the app please follow [this guide](https://docs.expo.io/workflow/development-mode/).

## Run tests

```sh
./scripts/run_tests
```

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

---

# Report

## Pair Programming

We used discord in order to pair program. One of us streamed their screen - and the other one would watch and provided feedback to the other. 

The first feature we pair programmed was adding drinks to order (commit id `277af89c69fa9b21a8ed9fda44fd6882b91bb547`). Before beginning to write code Mo went through the add pizza to order feature with Patrick and explained the code. After that we brought forth what we could improve if we were to do it differently. After that Mo went on to completing the feature. The whole process took around 3 hours given that we were both still getting used to pair programming  together. The second feature was adding orders to the frontend. This time Patrick was the driver and Mo the navigator. This time around we also spent another 3 hours. Mo first went through his code for the orders to explain it to Patrick - and then Patrick went on to integrating. Reflecting on this process made us realise that we were not able to get features done more quickly since adding orders required quite a lot more work then the first feature. However - we still need to improve upon the process given that our solo output is still more efficient.



## Program Design

In terms of design this code base is quite a disappointment. Even though the features are present the code is oriented around it being an API. So there really is no business logic outside of calling the database and storing/retrieving the data via the routes. The main reason for this was because we were both getting used to the tech stack. However, this made it quite clear to us that in order to have a better design for our team project we will need to improve upon our understanding of what is `Good Software Design` as well as improve upon our process of designing software. Mo has already looked through a lot of resources after realising the fact that the API was poorly designed to rectify this issue. Unfortunately, this realisation came towards the end of the assignment deadline. If we are to make changes we would definitely separate the business logic from the database by using objects that utilise abstractions to specify the Use Cases of our application. For example, instead of just having routes that call the database we would have an intermediate abstract class for each of our model objects which would define the methods that are required for passing all our Use Cases. Then we would implement persistence as a plugin rather than a core feature of our API. This has already been done to some extent in the `crud model`, however it is still coupled with the database itself and does not per-say provide any business logic (i.e. there is no calculation for getting the total order price). The moral of the story is that both of us were too engaged with learning the technology that we would be using for our team projects that we failed to see the bigger picture. In terms of cohesion most models only known of their own existence with the exception of those who end up having to store different models (i.e. Order stores Pizzas and Drinks).  



## Overall

We do realise that we ended up doing more than we were required to do (i.e. having a database as well as a frontend mobile app) - and this has cost us to pay by not be able to meet the precise requirements of the assignment. However, we had a good reason to doing so. We noticed that this would be the perfect opportunity for us to get as familiar as possible with the software stack that our team has decided to use for delivering the MVP to our partner. Hence, overall even if this might cost us on a personal level we are confident that this decision was in the best interest of our team and partner. Thus, the lessons that we have learned though bitter will serve us in the end. 😀