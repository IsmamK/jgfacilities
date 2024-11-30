const addAboutPageData = async () => {
    if (db) {
      await db.aboutPage.insert({
        about1Component: {
          title: "Empowering Each Other to Succeed",
          description: "Every project we've undertaken has been a collaborative effort, where every person involved has left their mark.",
          image1: "https://pagedone.io/asset/uploads/1717741205.png",
          image2: "https://pagedone.io/asset/uploads/1717741215.png",
        },
        about2Component: {
          title: "The Tale of Our Achievement Story",
          description: "Our achievement story is a testament to teamwork and perseverance. Together, we've overcome challenges, celebrated victories, and created a narrative of progress and success.",
          stats: [
            { title: "33+ Years", description: "Influencing Digital Landscapes Together" },
            { title: "125+ Projects", description: "Excellence Achieved Through Success" },
            { title: "26+ Awards", description: "Our Dedication to Innovation Wins Understanding" },
            { title: "99% Happy Clients", description: "Mirrors our Focus on Client Satisfaction." },
          ],
          buttonLabel: "Read More",
          imageUrl: "https://pagedone.io/asset/uploads/1717742431.png",
        },
        faqComponent: {
          title: "Frequently Asked Questions",
          subtitle: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.",
          faqs: [
            {
              question: "What services do you offer?",
              answer: "We offer a variety of services including event planning, venue booking, and catering options tailored to your needs."
            },
            {
              question: "How can I book a venue?",
              answer: "You can book a venue through our website by selecting your desired location, date, and filling out the booking form."
            },
            {
              question: "What is your cancellation policy?",
              answer: "We have a flexible cancellation policy. Please refer to our terms and conditions for specific details regarding cancellations and refunds."
            },
            {
              question: "Can I customize my event package?",
              answer: "Yes, we offer customizable event packages to fit your specific needs and preferences."
            },
          ],
        },
        teamComponent: [
          { id: 1, name: "Alfred", position: "Lead Designer", imageUrl: "https://example.com/alfred.jpg" },
          { id: 2, name: "Emily", position: "Project Manager", imageUrl: "https://example.com/emily.jpg" },
          { id: 3, name: "Michael", position: "Backend Developer", imageUrl: "https://example.com/michael.jpg" },
          { id: 4, name: "Sophia", position: "Frontend Developer", imageUrl: "https://example.com/sophia.jpg" },
        ],
      });
    }
  };
  
  // Call the function where necessary
  addAboutPageData();
  