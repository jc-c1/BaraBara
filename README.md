[![Link to YummyBara Youtube Demo](https://img.youtube.com/vi/8ye5EbyPvg8/0.jpg)](https://www.youtube.com/watch?v=8ye5EbyPvg8)


## Inspiration
According to Statistic Canada, 3.7 Millions of Canadians were living with diabetes in 2020-2021. As stressed out computer science students, we have been putting on weight over the past semester ourselves. Previously, calories tracking has been extremely instrumental in keeping one of our member's diet healthy when she embarked on her weight loss journey; however, unfortunately, currently existing applications are fairly tedious to operate which do not encourage long term sustainability of good habits. With the recent innovative development in image recognition and AI/LLM technologies, our team was inspired to utilize these tools to lessen obstacles for user to a healthy diet and lifestyle!  

Sources:
> https://www.canada.ca/en/public-health/services/publications/diseases-conditions/snapshot-diabetes-canada-2023.html

## What it does
YummyBara is a Healthy Lifestyle mobile app that enables users to track and monitor their caloric intake overtime with a simple snap of a photo!

## How we built it
- Frontend: <strong> React Native </strong>
- Backend: <strong> Firebase </strong>
- Database: <strong> Firestore </strong>
- ML models:  
> Object-size detection: <strong> Roboflow </strong>  
> Food-image recognition: <strong> Google Vertex </strong>  
- Calories generation: <strong> Google Gemini </strong>

## Challenges we ran into
- Gemini not available in Canada
- Roboflow conflicts with Expo Start
- Training for consistent and accurate results from model
- Short OAuth2 expiration for Google Vertex settings
- Mapping and standardizing data input and output between models
- Painful GIT integrations!!!!!!! :’(

## Accomplishments that we're proud of
- Learnt to work with React Native, setting up Firebase, working with Firestore for CRUD functionalities
- Learnt to implement existing AI/LLM and effectively prompt engineer to retrieve proper information
- Learnt to train our own data models, implementing our data, and seeing it working!!    
- Our team is consisted of:  
> 3 first year CS students with <em>no previous coding experience</em>  
> 1 second year CS student <em> </em>     

As beginners, we are just so proud of stepping out of our comfort zone, diving into these learning challenges, and  working with unfamiliar knowledge domains!
  

## What's next for YummyBara
- Increase data size to improve sensitivity for both models
- Personalized AI lifestyle improvement suggestions and planning
- Favourite foods functionality
- Multilingual support    
  
  
<strong> Hope you like our app! :) Feel free to leave any feedback in the comment section!</strong> 
