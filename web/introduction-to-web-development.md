# Introduction to Web Development - Day 1
### No Coding Today - Just Understanding How the Web Works

**Audience:** Complete beginners, first day of class
**Duration:** 60-90 minutes
**Goal:** By the end of today, every student can explain in simple words how the internet works and how we visit a website. No computer coding today.

**Teacher rule for today:** No code. Only stories, analogies, drawings on the board, and discussion.

---

## 1. Welcome - What is Web Development?

Start with this question for the class:
What websites or apps did you use today?

Write answers on the board: Google, YouTube, WhatsApp, TikTok, Jumia, school portal, etc.

Then explain:

Web development simply means building things that people use through a web browser or the internet - like websites and web apps.

A web developer is someone who builds and maintains those websites.

There are many jobs in web development, but today we only want to answer one big question:

What actually happens when you type google.com and press Enter?

To answer that, we need 10 simple ideas.

---

## 2. Idea 1: The Internet vs The Web - They Are Not The Same

Many students think Internet and Web are the same. They are not.

1. The Internet is the physical network. Cables under the sea, mobile towers, WiFi routers, and millions of connected computers. It is like the road system of a country.

2. The Web, also called the World Wide Web, is a service that runs on top of the Internet. It is the pages, images, videos and links we view. It is like the cars, shops and houses that use the roads.

Other things also use the Internet but are not the Web. For example: email, WhatsApp calls, online games, Netflix streaming.

Simple memory trick:
Internet = Roads. Web = Places you visit using those roads.

Brief history to tell as a story:
The Internet started in the 1960s-70s for researchers and the military to share information. The Web was invented in 1989-1990 by Tim Berners-Lee. He created the first website so scientists could easily share documents with links. That idea of clicking links became the Web we use today.

---

## 3. Idea 2: How Are We Connected? ISP, Router, Cables

Ask students: How does internet reach your phone?

Explain the chain in simple order:

1. Your device - phone, laptop, school computer.
2. Router / WiFi / Mobile data - this sends your signal to the outside world.
3. ISP - Internet Service Provider. This is the company you buy internet from, like MTN, Airtel, Safaricom, or a school network provider. You pay them, they connect you to the global Internet.
4. Undersea cables, fibre, and mobile towers - these carry internet across cities and countries.
5. Data centers - huge buildings full of computers that store websites and videos.

Analogy: Just like you need an electricity company to get light at home, you need an ISP to get internet on your device.

---

## 4. Idea 3: IP Address - Every Computer Has a Phone Number

Every computer connected to the Internet has its own unique address called an IP Address. IP means Internet Protocol.

It is exactly like a phone number. If you want to call someone, you need their number. If one computer wants to talk to another computer, it needs its IP address.

Example of an IP address:
192.168.1.1 and 142.250.80.46

There are two types your students may hear about:

1. IPv4 - the old type. Looks like four numbers separated by dots, for example 8.8.8.8 which is one of Google's addresses. We are running out of these because there are too many devices.

2. IPv6 - the new longer type for the future, because we need billions more addresses for phones, TVs, watches, etc.

Important point: Computers love IP addresses, but humans hate remembering numbers. That is why we invented domain names next.

Activity: Ask a student to memorize 142.250.80.46 in 10 seconds. Everyone will laugh. Then say: See, that is why we don't use IP addresses directly.

---

## 5. Idea 4: Domain Name - The Human-Friendly Name

A domain name is the easy name we type instead of an IP address.

Instead of typing 142.250.80.46, we just type google.com.

Other examples: facebook.com, unilag.edu.ng, wikipedia.org, my-school.com

Parts of a domain:

Take www.google.com

- com is called the extension or top-level domain. It tells you the type. Common ones are com for companies, org for organizations, edu for schools, gov for government, ng for Nigeria, ke for Kenya, gh for Ghana.
- google is the main name that a person or company chose and paid for.
- www just means World Wide Web service. Most sites work with or without it today.

How do you get a domain? You rent it per year from a domain registrar company. You do not buy it forever. If you stop paying, someone else can take it.

Example discussion: If you started a bakery called Sweet Bites, what domain would you like? sweetbites.com? sweetbites.ng? Check together why short and easy names are better.

---

## 6. Idea 5: DNS - The Phonebook of the Internet

DNS means Domain Name System.

It is the phonebook of the Internet. It translates human names to computer numbers.

When you type google.com, DNS finds the correct IP address behind it, so your browser knows where to go.

Steps in very simple words:

1. You type google.com
2. Your browser asks DNS: What is the IP for google.com?
3. DNS answers: It is 142.250.80.46
4. Now your browser can go to that computer and ask for the page.

Without DNS, we would have to memorize numbers for every site.

Analogy: You tap Mummy in your phone contacts. You don't dial her number, your phone finds the number for you. DNS does the same for websites.

---

## 7. Idea 6: URL - The Full Address

URL means Uniform Resource Locator. It is the full address that tells the browser exactly what page to open, not just which website.

Example: https://www.google.com/search?q=cake

Break it down for students without any technical jargon:

- https - the rule for safe communication. We will explain this next.
- www.google.com - the domain name, which website to visit.
- /search - which page or service inside that website.
- ?q=cake - extra details, here it means search for the word cake.

Another example: https://www.school.com/about

This means: use safe connection, go to school.com website, open the about page.

Common mistake to correct: google.com is the domain. The full long text in the address bar is the URL.

---

## 8. Idea 7: Client, Server, and Browser

These three words appear every day in web development. Teach them with a restaurant story.

1. Client: The customer who orders food. In web terms, this is your phone or laptop asking for a page. The browser is acting on behalf of the client.

2. Server: The kitchen that prepares food and never closes. In web terms, this is a powerful computer that is always on and stores websites. It waits for requests and sends back pages.

3. Browser: The waiter who carries your order to the kitchen and brings food back to your table. Chrome, Edge, Firefox, Safari are all browsers. They ask for pages, receive them, and show them nicely on screen.

Important correction: Google is NOT a browser. Google is a search engine and company. Chrome is the browser made by Google. Many students confuse this.

Other servers: There are file servers, video servers like YouTube servers, and game servers. They all do the same job - wait, receive request, send response.

---

## 9. Idea 8: What Happens When You Press Enter? The Full Journey

Put this on the board. Walk through slowly. This is the most important part of Day 1.

Let's say a student types www.example.com and presses Enter:

Step 1: Browser checks DNS to turn example.com into an IP address.

Step 2: Browser travels through the Internet via your router and ISP to reach that server computer.

Step 3: Browser says: Please send me the homepage.

Step 4: Server finds the stored files for that page.

Step 5: Server sends the page back across the Internet in small pieces called packets. Packets are like breaking a big pizza into slices for delivery, then joining them back together on arrival.

Step 6: Browser receives all pieces, joins them, and displays the page with text, images, and links.

If any step fails - no data, wrong address, server is off - you get an error like Site can't be reached or 404 Not Found. 404 simply means server is working, but that specific page was not found.

Draw this as: Student Device -> ISP -> Internet -> DNS -> Server -> Back to Student Device.

---

## 10. Idea 9: HTTP and HTTPS - The Rules of Talking

HTTP means HyperText Transfer Protocol. Big grammar, simple meaning: It is the agreed rules and language that browser and server use to talk to each other.

HTTPS is the same but S means Secure. The conversation is encrypted so thieves on the way cannot read passwords or bank details.

How to see it: Look at the address bar. If you see a padlock and https, it is secure. If you see Not Secure and http, do not enter passwords there.

Analogy: HTTP is like sending a postcard - anyone can read it on the way. HTTPS is like sending a sealed locked box - only sender and receiver can open it.

---

## 11. Idea 10: Where Do Websites Live? Hosting and Data Centers

Ask: If I build a website on my laptop and turn my laptop off, can others still see it? No.

So websites must live on computers that are always on, always connected, with backup power. Those computers are called web servers, and they live in special buildings called data centers.

Hosting means renting space on those always-on computers so your website is available day and night for everyone in the world.

Types students should know by name only today:

1. Shared hosting - like renting one room in a big house. Cheap, good for small sites.
2. VPS and Dedicated - like renting a full flat or full house. More power, more cost.
3. Cloud hosting - like renting space that can grow automatically when many visitors come. Used by Netflix, Jumia, banks.

You do not need details today. Just remember: A website must be hosted to be visible to others.

---

## 12. Other Words Students Will Hear - Explained Simply

Cover these quickly so they are not confused later in the course:

1. Webpage vs Website vs Web App:
A webpage is one single page, like one page in a book. A website is a collection of pages under one domain, like the whole book. A web app is an interactive website where you can do things, like log in, post, buy, chat - for example Instagram, Gmail, bank portals.

2. Search Engine vs Browser:
Browser is the app you use to view websites. Search engine is a website that helps you find other websites. Chrome and Firefox are browsers. Google Search and Bing are search engines.

3. Static vs Dynamic Website:
Static is like a printed poster - same for everyone, rarely changes. Example: a restaurant menu page. Dynamic is like a market - content changes per person and per time. Example: Facebook feed is different for each user.

4. Frontend vs Backend in one sentence, no details:
Frontend is what you see and touch on screen. Backend is the hidden work behind - saving data, checking passwords, processing payments. Full-stack means someone who does both. We will learn this properly in Week 2 and 3.

5. World Wide Web - the system of linked pages we browse. Invented by Tim Berners-Lee. The www in addresses comes from this name.

6. Download vs Upload:
Download is taking from server to your device, like watching a video. Upload is sending from your device to server, like posting a photo on Instagram.

---

## 13. What We Will Learn Next - No Code Today

End the class with excitement, not fear.

Tell students:

Today we learned the theory - the roads, addresses, phonebook, and journey.

From next class, we will start building:

- Part 1: How pages are structured - called HTML
- Part 2: How pages are beautified - called CSS
- Part 3: How pages become interactive - called JavaScript
- Part 4: How to put our site online for the world to see - called deployment

You do not need to memorize those names today. Just know they are coming.

---

## 14. Class Activities - 20 Minutes, No Computers Needed

Pick 2-3:

1. Draw the journey: Give paper. Each student draws: Me -> ISP -> Internet -> DNS -> Server -> Back to Me. Label each part.

2. Phonebook game: One student is DNS. Another shouts google.com. DNS student shouts back an IP number written on a card. Class laughs and remembers.

3. Spot the parts: Write 3 URLs on board. Students underline domain, extension, and page part with different chalk colors.

4. Browser vs Search Engine quiz: Call out names - Chrome, Google Search, Firefox, Bing, Safari, Edge. Students shout Browser or Search Engine.

5. Discussion: What happens if DNS breaks? What happens if your ISP has no network? Why do we see 404 sometimes?

---

## 15. Quick Oral Quiz - For Day 1 Assessment

No writing code. Just speaking or multiple choice:

1. What is the difference between Internet and Web?
2. What does IP address do? What is it similar to?
3. Why do we need domain names?
4. What does DNS do?
5. What is the difference between a domain and a URL?
6. Is Chrome a search engine or a browser?
7. Who is the client and who is the server in a restaurant story?
8. What does the S in HTTPS mean? Why is it important?
9. Where do websites live so they are always available? What is hosting?
10. What happens step by step when you type a website and press Enter?
11. What is the difference between a webpage, a website, and a web app?
12. What is the difference between download and upload?

If a student can answer 8 out of 12 in their own words, Day 1 is a success.

---

## 16. Homework - Observe, No Coding

1. At home, open a browser and write down 5 URLs you visit. For each one, underline the domain name.
2. Ask what ISP your home uses. Is it WiFi, fibre, or mobile data?
3. Find the padlock icon in the browser. Click it once and see what it says.
4. Think of a business idea. What domain name would you like for it? Write 3 options.

Bring answers next class. No computer work required if they have no laptop - they can use a parent's phone browser.

---

## 17. Teacher Notes and Glossary

Keep this page for yourself and read key definitions aloud.

- Internet: Global network of connected computers and cables.
- Web / World Wide Web: Pages and content we view using browsers over the Internet.
- ISP: Company that gives you internet access.
- IP Address: Unique number address of each device on the Internet.
- Domain Name: Human-friendly name like google.com used instead of IP numbers.
- DNS: System that translates domain names to IP addresses. The phonebook.
- URL: Full address of a specific page.
- Client: Device that asks for content.
- Server: Always-on computer that stores and sends content.
- Browser: App that asks for, receives, and displays web pages.
- HTTP / HTTPS: Rules for communication between browser and server. HTTPS is secure.
- Packets: Small pieces in which data travels across the Internet.
- Hosting: Renting space on always-on servers to make a website public.
- Data Center: Building full of servers where websites live.
- Search Engine: Website that helps you find other websites.
- Webpage: Single page. Website: Collection of pages. Web App: Interactive site where you can do tasks.
- Download: Receive from server. Upload: Send to server.
- Frontend: Visible part. Backend: Hidden logic and data part.

Common misconceptions to correct on Day 1:
- Internet and Web are not the same.
- Google is not a browser, Chrome is.
- A website does not stay online from your laptop unless it is hosted.
- Memorizing IP addresses is not needed because DNS and domains exist.

Happy teaching - see you on Day 2 for our first build!
