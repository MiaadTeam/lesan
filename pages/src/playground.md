# Playground

## First Encounter

When you first enter the playground, you will see 3 part :

![PlayGround](https://github.com/MiaadTeam/lesan/assets/96171913/cf41b432-3d81-4e8d-aeea-173d94ac307e)

### Part One : Tabs

At the top of the page there are tabs that allow you to do different things at the same time without losing information.
You can make and use as many tabs you need(2) with add button(1) and close them at any time with close button(3).
By refreshing the page, the tabs information does not disappear and after the tab refresh the tabs are fully accessible.

![Tabs](https://github.com/MiaadTeam/lesan/assets/96171913/53236d31-fc9a-4bbf-b5c7-0b89c7f3eafa)

### Part Two: Sidebar

On the left side is the sidebar, with 3 select box that are used to select the **service(1)**, **Schema(2)** and **Action(3)**, respectively.
It should be noted that the selection of Schema and act is inactive until the service is selected.

![Sidebar](https://github.com/MiaadTeam/lesan/assets/96171913/68921473-49c9-4a6c-b35d-f008eb971c0f)

#### Second Sidebar

After selecting the service, Schema and act, another column is displayed, which includes 2 sections of **set fields(1)** and **get fields(2)**.
In the set fields, you fill in the values you need(1-1) and in the get field section you choose the values you want to get and also we either want the field to set the field equal to one or we do not want the amount to be zero(2-1).
After completing the sections of the set fields and get fields set, by pressing the **Send Button(3)**, the results we have had in the response section are shown in the response section.

![Second Sidebar](https://github.com/MiaadTeam/lesan/assets/96171913/b51c0711-8360-4676-bf52-cee550b1da73)

![Response](https://github.com/MiaadTeam/lesan/assets/96171913/ecf0476b-3abb-452b-928b-1155245fd0f3)

#### Response Section

At the top of the response section, we have access to 3 button, **copy Request(1)**, **copy Response(2)** and **Run E2E Test(3)** that send the request to the E2E Test modal that we will explain below.

Also we can see the **status of the request** who can be true with green light and false with red loght(4).

At the top-right of the body response we can access to the time of the request with **took(5)**.

![Response-Detail](https://github.com/MiaadTeam/lesan/assets/96171913/8d08de67-34d9-41ef-9c83-4c4b0790ae64)

### Part Three: Buttons

In this section we will see 6 buttons that we will explain below :

![Buttons](https://github.com/MiaadTeam/lesan/assets/96171913/74d38d01-d141-49a8-a4a3-64605d3fc5d9)

Before explain 6 buttons, **Notice** that in every modal we can use the **close button(1)** to close the modal.
![Modals](https://github.com/MiaadTeam/lesan/assets/96171913/e6ca7ab5-1cd0-4f77-90ed-47171dafc1a9)

Also we can use **change size button(2)** to see modal in full screen or window size.
![Modals-1](https://github.com/MiaadTeam/lesan/assets/96171913/c9c6648a-92e7-4252-938e-15861b999536)

![Modals-2](https://github.com/MiaadTeam/lesan/assets/96171913/600ad17c-5add-460b-95f9-9907d5ad5cb0)

#### Refetch button:

Pressing it all the data is **renewed** once.

![Reffetch Button](https://github.com/MiaadTeam/lesan/assets/96171913/507c1040-3f8d-4d1f-ac05-3497ab428a3c)

#### Settings button:

![Setting Button](https://github.com/MiaadTeam/lesan/assets/96171913/a41b22ad-3df1-4231-a97d-48905ae8b568)

Pressing that modal of settings open for us to see two parts of the **Fetch Config(1)** and the **Set Headers(2)**.

![Setting Detail](https://github.com/MiaadTeam/lesan/assets/96171913/3b78fbdb-e0d6-48d3-820c-ed5a17b38e6b)

In the fetch config section, we can set an **Url(1)** and press **Apply Button(2)** that we can bring the lesan to different addresses.

![Setting Detail-1](https://github.com/MiaadTeam/lesan/assets/96171913/a32d6f07-ab74-4bf6-afbf-01a90f739a71)

In the **set headers** we can also determine the **key(1)** and **value(2)**. also we can press **Add Header(3)** button to add many new **Key** and **Value** and set them wit **Apply(4)** button.

![Setting Detail-2](https://github.com/MiaadTeam/lesan/assets/96171913/a7ca1a74-9a71-4ac6-af26-293cd5f5bc0d)

#### History button:

By pressing **History button**, we enter the modal history in which we have access to all the **Requests(1)** as well as and **Responses(2)** the results.

In top-right of the Request section we can see the **Date Of The Request** and also in top-left of the Response we can see the **Time Of Response**.

In top-right of the every part of the request we can delete the this part with **Delete button(5)**.

Also we can clean all the request by press the **Dustbin Button(6)**.

![History](https://github.com/MiaadTeam/lesan/assets/96171913/28d82462-2077-46bf-a89f-914ec0010bfe)

In the request section we access to **Model and Act(1)** of the request and **Show Button(2)** to see the detail of the request and response.

![History-1](https://github.com/MiaadTeam/lesan/assets/96171913/07b5d370-5503-4d6f-abbd-1584802d3122)

We can hide the details with **Hide button**:
![History-2](https://github.com/MiaadTeam/lesan/assets/96171913/60d2fe07-2be7-4dc1-835c-c4dd2f5cf248)

In the response section, we can see the **Status Of The Response(1)** that can be true or false and also we can reuse of the request with **Use Button(2)**.

![History-3](https://github.com/MiaadTeam/lesan/assets/96171913/910039e6-44d1-41c3-a544-3dd601c845f0)

#### E2E Test button:

In E2E test modal, we see two section, section one include **Five Button** that the top-left of the modal and section two its be **Eeach Sequence** of the test.

![E2E](https://github.com/MiaadTeam/lesan/assets/96171913/7aae9089-1f63-4e8a-8817-bf111018e331)

We start with the section one, in this section we have five button include **Add(1)**, **Run E2E Test(2)**, **Import(3)**, **Export(4)** and **Help(5)**.

![E2E-1](https://github.com/MiaadTeam/lesan/assets/96171913/5efe1f56-0521-4d06-bc66-0be670772041)

With **Add Button** we can create a new Sequence for test. we can add how much we need sequence for test.

![E2E-2](https://github.com/MiaadTeam/lesan/assets/96171913/08ade581-ed47-4f9a-9637-08b50d710e1e)

With **Run E2E Test Button** we can run the test. we explain this after.

With **Import Button** we can import the pervious tests and reuse them.

![E2E-3](https://github.com/MiaadTeam/lesan/assets/96171913/74b1492b-110e-4f89-b58f-2a0a3614b280)

With **Export Button** we can export existing tests for use them for anothe test.

And with **Help Button** we go to playground document that we can see how to work with E2E modal.

<br>
 
In each sequence, we can see 2 part, **Set Test Body And Headers(1)** and **Set Repeat Time**, **Capture Variables(2)**
![E2E-4](https://github.com/MiaadTeam/lesan/assets/96171913/61978ef2-4d01-4308-8d61-bdd869781e3d)

Part 1 is a **Set Test Body And Headers** that we can write and set body and headers for test. also we can use the faker for test. for example you can see that we use faker for this sequense:
![E2E-4](https://github.com/MiaadTeam/lesan/assets/96171913/417f78ff-6910-4c7e-bee9-4240f5ad1c65)

In Part two we can **Set Repeat Time(1)** of the test with **+** or **-** button or write number we want in input. also we can use **Add Capture(2) Button** for set how many capture we want to the sequence for test.
![E2E-5](https://github.com/MiaadTeam/lesan/assets/96171913/f02db2ea-7ebd-4bed-bb7f-cca49cb84594)

After press the **Add Capture** we can see a part that include two input, include **set a variable name(1)** that we can see an **Example(2)** to how fill this input and another input, is **set a value for variable(3)** that we can see an **Example(4)** to how fill this input.
Also we can set capture couple model.
![E2E-6](https://github.com/MiaadTeam/lesan/assets/96171913/53ebe8a1-46fa-46be-a1ab-4bc51b45d135)

We have four button in top-right of the each sequence test:
![E2E-7](https://github.com/MiaadTeam/lesan/assets/96171913/cd29914a-bea2-41f4-88a5-738fddfe09e9)

**Duplicate Button(1)** that we can duplicate sequence.
![E2E-8](https://github.com/MiaadTeam/lesan/assets/96171913/d5da3b81-a41d-43f4-83fd-0d9ddfa4886c)

**Move Buttuns(2)(3)**, with this buttons we can move the sequense to top or bottom.

**Delete Button(4)**, with this button we can delete each sequence.

<br>

After write the sequences test, we can go to see the resulst of the each sequence test by click on the **Run E2E Test Button** and we see this:  
![E2E-9](https://github.com/MiaadTeam/lesan/assets/96171913/a65e1d8f-4fb2-424b-a5e5-67d1a2c063cd)

First thing that we see is **Back Button** and second is **Export Button** at the top-left of the modal.

third one is a **Information** section that we can see all information of the sequence tests.

![E2E-10](https://github.com/MiaadTeam/lesan/assets/96171913/2b6bcf62-731c-464d-b64f-f7c7d5d02cf2)

The **Information section** have three part, **Requests(1)**,**Times(2)** and **Captures Information(3)**.

![E2E-11](https://github.com/MiaadTeam/lesan/assets/96171913/d9f3e278-0ccb-4da7-9759-a2ac8bcfcbf6)

**Requests** part include **All Request Count(1)** , **All Request Time(2)**, **All Success Request(3)** and **All Fails Request(4)**.
![E2E-12](https://github.com/MiaadTeam/lesan/assets/96171913/e9b3880d-5e2a-410e-b5fd-071a61b57ce7)

**Times** part include two section, **Best** and **Worst**. in each section we can see the Best/Worst request time, sequence number of the best/worst request that when click on number, we scroll to that sequence number, request number that include number of the request in sequence, model and act.

![E2E-13](https://github.com/MiaadTeam/lesan/assets/96171913/17b04c22-bb05-41e6-af61-d7af47278f1e)

**Captures Information** part include every capture items that we set. in this part we can see the Key(1), Captured From(2), Value Of(2), Model(2), Act(2) and Captured Inside Sequnce Number.

![E2E-14](https://github.com/MiaadTeam/lesan/assets/96171913/69c65e44-6406-43f0-8484-b63906f16b51)

After **Information** section, we can access every sequence that each of sequence have two part, **Description(1)** and **Body Header(2)**.

![E2E-15](https://github.com/MiaadTeam/lesan/assets/96171913/e3d972b8-33e3-4300-a564-0253c5572554)

**Description** have five part include **Request(1)** that include All Request Count, Success/Fail that show the how many of request is success/Fail, All Request Time and Avrage Time For Each Request, **Best(2)** and **Worst(3)** that include Best/Worst Time and request nmber, **Capture Items(4)** that include key,value,model,act,sequence number, **Using Capture Items(5)** that include key,captured from, value,act and sequence number.

![E2E-16](https://github.com/MiaadTeam/lesan/assets/96171913/232b47f8-6bb8-408d-90f7-3f73ce3fce65)

**Body Header** have headers,body of the each sequence(1), number of sequence(2) at the top-right and change button(3) at the top-left.

![E2E-17](https://github.com/MiaadTeam/lesan/assets/96171913/78659241-6ffe-4663-9ebe-f4ac772b4b14)

When click on **Change Button** we can see and access to the **Request(1)** and **Response(2)** that in Request section we can see the pure request(3) and at the Response section we can see the **body of the response** and **success status of Responsewhich** the false or true(4).

At the top-right of the Response section we can see the **time of the Respone(5)**.

At the Bottom-center, we can access to the **pagination(6)** to move on the Requests or write the specefic Request number to access the Request.

Also when click on **change button(7)** to go back to the Body Header and Description.

![E2E-18](https://github.com/MiaadTeam/lesan/assets/96171913/a861629a-60c4-403d-be67-3cb4712f2239)

#### Schema button:

In **Schema** modal we have access to all the **Schema** project. For example, we can see the country,city and user.
![Schema](https://github.com/MiaadTeam/lesan/assets/96171913/845158ad-433e-4f8a-be14-bdb2eac1783e)

Country have pure(1) and related relations(2).
![Schema-1](https://github.com/MiaadTeam/lesan/assets/96171913/d50d1c4f-5bdb-427d-96a9-8a18d4edc894)

And pure have \_id(1), name(2), population(3), abb(4).
![Schema-2](https://github.com/MiaadTeam/lesan/assets/96171913/702c6441-267a-4b6c-97e1-2dbdc1b33883)

And Also related relations have cities asc(1), cities desc(2), cities by pop asc(3), cities by pop desc(4), capital city(5), users(6), users by age(7).
![Schema-3](https://github.com/MiaadTeam/lesan/assets/96171913/b651116a-a1c8-4933-82ff-bf9e4c43658c)

Also by hovering on question icon we can see the relations.
![Schema-4](https://github.com/MiaadTeam/lesan/assets/96171913/f5136d49-812d-467e-81d1-5146e3d294ca)

We see the country, lets see the **city**. city have pure(1), main Relation(2), related relations(3).
![Schema-5](https://github.com/MiaadTeam/lesan/assets/96171913/4149d856-e008-4384-a25a-191327a65c59)

Pure have \_id(1), name(2), population(3), abb(4).
![Schema-6](https://github.com/MiaadTeam/lesan/assets/96171913/a01aa365-066f-43dd-b940-95f81632e27f)

main relations have **country** and country have \_id, name, population and abb.
![Schema-7](https://github.com/MiaadTeam/lesan/assets/96171913/e115725c-2e62-4637-adc7-0180a7708684)

Also by hovering on question icon we can see the relations.
![Schema-8](https://github.com/MiaadTeam/lesan/assets/96171913/b6123daf-50d4-446f-90cd-377d7b634a2f)

And **related relations** have users(1) and loved user(2).
![Schema-9](https://github.com/MiaadTeam/lesan/assets/96171913/89a7d6c4-7d93-4cb9-b676-fe5ff9dcf2e3)

Users have \_id, name, age.
![Schema-10](https://github.com/MiaadTeam/lesan/assets/96171913/d63aeea6-f2bd-4f8b-bf3e-07e6ebb9737f)

#### Act button:

Like Schema modal in **Act** modal , we have access to all the **Act** of the project.
Act have **main** and main have country(1), city(2), user(3).
![Act-1](https://github.com/MiaadTeam/lesan/assets/96171913/c32c8b82-d104-4bce-aca9-6ba1de07e607)

And **country** have add country(1), update country(2), add countries(3), get countries(4), delete country(5).
![Act-2](https://github.com/MiaadTeam/lesan/assets/96171913/2b5a32d3-1984-4233-9dd9-964c022fcf1c)

Let see the add country. we can see the set(1) and get(2).
![Act-3](https://github.com/MiaadTeam/lesan/assets/96171913/6988764f-3b63-4657-9652-5a562f773957)

**Set** have name(1), population(2) and abb(3).
![Act-4](https://github.com/MiaadTeam/lesan/assets/96171913/1c09be5f-b0e0-4537-886b-bdf8ab5194d8)

And **get** have \_id(1), name(2), population(3), abb(4), users(5).
![Act-4](https://github.com/MiaadTeam/lesan/assets/96171913/31cc2d81-a346-419f-ba06-a3241c7b7efe)
