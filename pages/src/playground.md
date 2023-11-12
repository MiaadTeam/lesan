# Playground

## First Encounter

When you first enter the playground, you will see three part :

![PlayGround](https://github.com/MiaadTeam/lesan/assets/96171913/cf41b432-3d81-4e8d-aeea-173d94ac307e)

### Part One : Tabs

At the top of the page there are tabs that allow you to do different things at the same time without losing information.
You can make and use as many tabs you need(2) with add button(1) and close them at any time with close button(3).
By refreshing the page, the tabs information does not disappear and after the tab refresh the tabs are fully accessible.

![Tabs](https://github.com/MiaadTeam/lesan/assets/96171913/53236d31-fc9a-4bbf-b5c7-0b89c7f3eafa)

### Part Two: Sidebar

On the left side is the sidebar, with three select box that are used to select the service(1), Schema(2) and Action(3), respectively.
It should be noted that the selection of Schema and act is inactive until the service is selected.

![Sidebar](https://github.com/MiaadTeam/lesan/assets/96171913/68921473-49c9-4a6c-b35d-f008eb971c0f)

#### Second Sidebar

After selecting the service, Schema and act, another column is displayed, which includes two sections of set fields and get fields.
In the set fields, you fill in the values you need and in the get field section you choose the values you want to get. In this section, we either want the field to set the field equal to one or we do not want the amount to be zero. The third is that the values are completely inactive.

![Second Sidebar](https://github.com/MiaadTeam/lesan/assets/96171913/b51c0711-8360-4676-bf52-cee550b1da73)

After completing the sections of the set fields and get fields set, by pressing the send button, the results we have had in the response section are shown in the response section.

![Response](https://github.com/MiaadTeam/lesan/assets/96171913/ecf0476b-3abb-452b-928b-1155245fd0f3)

#### Response Section

At the top of the response section, we have access to three button, **copy Request(1)**, **copy Response(2)** and Run E2E Test(3) that send the request to the E2E Test modal that we will explain below.

also we can see the status of the request who can be true with green light and false with red loght.

at the top-right of the body response we can access to the time of the request wit **took**.
![Response-Detail](https://github.com/MiaadTeam/lesan/assets/96171913/8d08de67-34d9-41ef-9c83-4c4b0790ae64)

### Part Three: Buttons

In this section we will see six buttons that we will explain below :

![Buttons](https://github.com/MiaadTeam/lesan/assets/96171913/74d38d01-d141-49a8-a4a3-64605d3fc5d9)

In every modal we can use the **close button(1)** to close the modal.
![Modals](https://github.com/MiaadTeam/lesan/assets/96171913/e6ca7ab5-1cd0-4f77-90ed-47171dafc1a9)

Also we can use **change size button(2)** to see modal in full screen or window size.
![Modals-1](https://github.com/MiaadTeam/lesan/assets/96171913/c9c6648a-92e7-4252-938e-15861b999536)

![Modals-2](https://github.com/MiaadTeam/lesan/assets/96171913/600ad17c-5add-460b-95f9-9907d5ad5cb0)

#### Refetch button:

Pressing it all the data is **renewed** once.

![Reffetch Button](https://github.com/MiaadTeam/lesan/assets/96171913/507c1040-3f8d-4d1f-ac05-3497ab428a3c)

#### Settings button:

![Setting Button](https://github.com/MiaadTeam/lesan/assets/96171913/a41b22ad-3df1-4231-a97d-48905ae8b568)

Pressing that modal of settings opens for us to see two parts of the **fetch config(1)** and the **set headers(2)**.

![Setting Detail](https://github.com/MiaadTeam/lesan/assets/96171913/3b78fbdb-e0d6-48d3-820c-ed5a17b38e6b)

In the fetch config section, we can set an **Url(1)** and press **Apply Button(2)** that we can bring the lesan to different addresses.

![Setting Detail-1](https://github.com/MiaadTeam/lesan/assets/96171913/a32d6f07-ab74-4bf6-afbf-01a90f739a71)

In the **set headers** we can also determine the **key(1)** and **value(2)**. also we can press **Addd Header(3)** button to add many new **Key** and **Value** and set them wit **Apply(4)** button.

![Setting Detail-2](https://github.com/MiaadTeam/lesan/assets/96171913/a7ca1a74-9a71-4ac6-af26-293cd5f5bc0d)

#### History button:

By pressing **History button**, we enter the modal history in which we have access to all the **Requests(1)** as well as and **Responses(2)** the results.

In top-right of the Request section we can see the **Date Of The Request** and also in top-left of the Response we can see the **Time Of Request**.

In top-right of the every part of the request we can delete the this part with delete button(5).

Also we can clean all the request by press the **Dustbin Button(6)**.

![History](https://github.com/MiaadTeam/lesan/assets/96171913/28d82462-2077-46bf-a89f-914ec0010bfe)

In the request section we access to **Model and Act(1)** of the request and **Show Button(2)** to see the detail of the request and response.

![History-1](https://github.com/MiaadTeam/lesan/assets/96171913/07b5d370-5503-4d6f-abbd-1584802d3122)

We can hide the details with **Hide button**:
![History-2](https://github.com/MiaadTeam/lesan/assets/96171913/60d2fe07-2be7-4dc1-835c-c4dd2f5cf248)

In the response section, we can see the **Status Of The Response(1)** that can be true or false and also we can re use of the request with **Use Button(2)**.

![History-3](https://github.com/MiaadTeam/lesan/assets/96171913/910039e6-44d1-41c3-a544-3dd601c845f0)

#### E2E Test button:

In modal test, we can write a variety of tests to review our requests.
At the top of the modal test, respectively, the adding a new test, the run e2e test button, import previous tests, export existing tests, and finally the help button that explains how to work with the tests There is a dose.

Each part of the test is divided into two parts, the left side is for set test body and headers of the tests, and the right side is to set repeat time this test should be repeated, as well as adding a capture.

After the tests, we enter the test results by pressing the run e2e test button.

In the test results section, there are buttons back to the test writing section as well as exprot from the results.

Test results information is available in several sections, including **requests**, **times**, and **capturs information**, where we can view the number of requests and the number of successful and failed requests in the applications section, along with the overall application time .

In the time section we can take the **best** and **worst** time with the sequence number and the requested number in which the best or worst time is obtained with its model and act.

In the capture information section, we have access to full information of the captures.

At the bottom of the information section, all requests are available in two parts: **body header** and **descriptions**.
In the body header section, the request information is recorded, and in the descriptions section, such as the information section, the information such as the number of requests and how successful or failed, and the best and worst time and capture of the items and captures of uses Are available.

At the top of each sequence there is a change button that we can see this time the request information and the response of the request can be seen so that we can easily refer to other requests in this sequence.

#### Schema button:

In Model Schema we have access to all the project schema that by pressing each section we can see the type of relationships and the type of typing.

#### Act button:

Like Modal Schema, we have access to all the projects of the project that we can see by pressing each section and typing them.

بخش دوم : سایدبار
در سمت چپ، ساید بار قرار دارد که در آن سه سلکت باکس قرار دارد که به ترتیب برای انتخاب سرویس، انتخاب اسکیما و انتخاب اکت دلخواه استفاده می شود.
باید توجه داشت که تا زمانی که سرویس دلخواه انتخاب نشده باشد، انتخاب اسکیما و اکت غیر فعال است.

بعد از انتخاب سرویس،اسکیما و اکت، یک ستون دیگر نمایش داده می شود که شامل دو بخش افزودن فیلد ها و نیز دریافت فیلد ها است.
در بخش ست فیلدس، مقادیری که لازم هست رو پر می کنید و در بخش گت فیلدس مقادیری که مایل به گرفتن آن ها هستید رو انتخاب می کنید. در این بخش مقادیر رو یا می خواهیم که فیلد مورد نظر رو برابر یک قرار می دهیم و یا اون مقدار رو نمی خواهیم که برابر صفر قرار می دهیم. حالت سوم هم کلا غیر فعال بودن مقادیر هست.

بعد از تکمیل کردن بخش های ست فیلدس و گت فیلدس، با زدن دکمه ارسال، نتایج درخواستی که داشته ایم در بخش پاسخ نشان داده می شود.

در بالای بخش پاسخ، ما به دکمه های کپی کردن درخواست، کپی کردن نتایج و نیز دکمه اجرای ای تو ای تست که با زدن آن به بخش ی تو ای تست می رویم که در ادامه بیشتر آن را توضیح می دهیم دسترسی داریم.

بخش سوم: دکمه ها
در این بخش ما شش دکمه را مشاهده می کنیم که در ادامه به توضیح آنها می پردازیم:
دکمه ری فتچ: با فشردن آن کل داده ها یکبار تازه سازی می شود.
دکمه تنظیمات : با فشردن آن مودال تنظیمات برایمان باز می شود که در این مودال دو بخش فتچ کانفیگ و نیز ست هدرس را مشاهده می کنیم.

در بخش فتچ کانفیگ ما می توانیم یک یو آرر ال ست کنیم که به وسیله آن می توانیم لسان را در آدرس های متفاوت بالا بیاریم.
در بخش ست هدرس نیز می توانیم کلید و مقدار تعیین کنیم.

دکمه تاریخچه :
با فشردن این دکمه وارد مودال تاریخچه می شویم که در آن به تمامی درخواست ها و نیز و پاسخ نتایج ها به صورت کامل و جزپی دسترسی داریم.
در این مودال قابلیت استفاده دوباره از درخواست ها به وسیله دکمه استفاده فراهم شده است.

دکمه ای تو ای تست :
در مودال ای تو ای تست می توانیم انواع تست ها برای بررسی درخواست هایمان بنویسیم.
در بالای مودال تست به ترتیب از سمت چپ، دکمه اضافه کردن یک تست جدید، دکمه اجرای تست، وارد کردن تست های قبلی، خروجی گرفتن از تست های موجود و در نهایت دکمه کمک که توضیحاتی رو درباره نحوه کار با تست ها را توضیح می دهد وجود دارد.
هر بخش تست به دو قسمت تقسیم شده است، قسمت سمت چپ برای نوشتن بدنه و سر تست ها است و قسمت سمت راست برای تنظیم کردن تعداد دفعاتی که این تست باید تکرار شود و نیز اضافه کردن کپچر است.

بعد از نوشن تست ها، با فشردن دکمه اجرای تست وارد بخش نتایج تست ها می شویم.
در بخش نتایج تست ها ، دکمه های بازگشت به بخش نوشتن تست ها و نیز خروجی گرفتن از نتایج وجود دارد.
اطلاعات نتایج تست ها در چند قسمت، شامل اطلاعات درخواست ها، زمان ها و نیز اطلاعات کپچر ها وجود دارد که در بخش درخواست ها می توانیم تعداد درخواست ها و تعداد درخواست های موفق و شکست خورده را به همراه مدت زمان کلی درخواست ها مشاهده کنیم.
در بخش زمان های می توانیم بهترین و بدترین زمان را به همراه شماره سکانس و نیز شماره درخواستی که بهترین یا بدترین زمان در آن درخواست بدست آمده به همراه مدل و اکت آن قابل مشاهده است.
در بخش اطلاعات کپچر ها به اطلاعات کامل کپچرها دسترسی داریم.
پایین بخش اطلاعات، تمامی درخواست ها در دو قسمت بادی هدر و نیز توصیفات در دسترس هستند. در قسمت بادی هدر، اطلاعات درخواست ثبت شده است و در بخش توصیفات نیز همانند بخش اطلاعات، اطلاعات این درخواست همچون تعداد درخواست ها و اینکه چه تعداد موفق و یا شکست خورده اند و بهترین و بدترین زمان و کپچر ایتم ها و کپچر اییتم های استفاده شده در دسترس هستند.
در قسمت بالای هر سکانس دکمه تغییری وجود دارد که با فشردن آن این بار اطلاعات درخواست و نیز پاسخ این درخواست را نیز می توانیم مشاهده کنیم که این امکان فراهم شده تا بتوانیم به درخواست های دیگر این سکانس به راحتی رجوع کنیم.

دکمه اسکیما: در مودال اسکیما ما به تمامی اسکیماهای پروژه دسترسی داریم که با فشردن هر بخش می توانیم نوع روابط آن ها و نیز نوع تایپ آن ها را مشاهده کنیم.

دکمه اکت : همچون مودال اسکیما ما به تمامی اکت های پروژه دسترسی داریم که با فشردن هر بخش می توانیم نوع آن ها و نیز تایپ آن ها را مشاهده کنیم.
