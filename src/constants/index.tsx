export const USER_PROGRAMS = [
  {
    id: 1,
    first_name: "Sarah",
    profilePic: "https://randomuser.me/api/portraits/women/74.jpg",
    medical_goal: "Recover from the flu",
    height: "5'6\"",
    weight: "165 lbs",
    age: 34,
    symptoms: ["Fever", "Chills", "Fatigue", "Body aches"],
    diagnosed_conditions: ["Influenza (Flu)"],
    medical_history: ["Seasonal flu every winter"],
    current_medications: ["Oseltamivir (Tamiflu)"],
    treatment_plan: {
      title: "Acute Flu Recovery Plan",
      weekly_schedule: [
        { day: "Daily", focus: "Rest and hydration", duration: "Throughout the day" },
        { day: "Daily", focus: "Medication and temperature check", duration: "10 min" },
      ],
      description:
        "This plan supports recovery from influenza with antiviral medication, fluid intake, and symptom monitoring. Contact a doctor if symptoms worsen or persist beyond 7 days.",
    },
    diet_plan: {
      title: "Hydration and Immunity Support Plan",
      daily_calories: "1,400-1,600 calories",
      macros: { protein: "25%", carbs: "50%", fats: "25%" },
      meal_examples: [
        { meal: "Breakfast", example: "Warm oatmeal with honey and banana" },
        { meal: "Lunch", example: "Chicken soup with carrots and garlic" },
        { meal: "Dinner", example: "Vegetable broth with soft rice and steamed greens" },
        { meal: "Snacks", example: "Citrus fruits, warm herbal teas, crackers" },
      ],
      description:
        "Light, easily digestible meals with emphasis on fluids, immune-boosting foods (like garlic and citrus), and comfort foods to support flu recovery.",
    },
  },
  {
    id: 2,
    first_name: "David",
    profilePic: "https://randomuser.me/api/portraits/men/81.jpg",
    medical_goal: "Treat Strep Throat",
    height: "5'11\"",
    weight: "180 lbs",
    age: 26,
    symptoms: ["Sore throat", "Swollen tonsils", "Pain when swallowing", "Fever"],
    diagnosed_conditions: ["Streptococcal Pharyngitis"],
    medical_history: ["Frequent throat infections"],
    current_medications: ["Amoxicillin"],
    treatment_plan: {
      title: "Strep Throat Antibiotic Course",
      weekly_schedule: [
        { day: "Daily", focus: "Antibiotic administration", duration: "3 times/day" },
        { day: "Daily", focus: "Hydration & throat care", duration: "Throughout the day" },
      ],
      description:
        "10-day course of antibiotics to eliminate infection and prevent complications. Rest, fluids, and throat-soothing care are recommended during this time.",
    },
    diet_plan: {
      title: "Throat Soothing Nutrition Plan",
      daily_calories: "1,800-2,000 calories",
      macros: { protein: "30%", carbs: "45%", fats: "25%" },
      meal_examples: [
        { meal: "Breakfast", example: "Scrambled eggs and warm tea with honey" },
        { meal: "Lunch", example: "Mashed potatoes and boiled vegetables" },
        { meal: "Dinner", example: "Plain pasta with soft steamed fish" },
        { meal: "Snacks", example: "Applesauce, popsicles, yogurt" },
      ],
      description:
        "Soft, cool, or warm foods that soothe the throat and avoid irritation. Avoid citrus, spicy, or crunchy foods until symptoms resolve.",
    },
  },
  {
    id: 3,
    first_name: "Elena",
    profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
    medical_goal: "Recover from a mild gastrointestinal infection",
    height: "5'4\"",
    weight: "130 lbs",
    age: 45,
    symptoms: ["Nausea", "Stomach cramps", "Loose stools", "Fatigue"],
    diagnosed_conditions: ["Viral Gastroenteritis (Stomach Bug)"],
    medical_history: ["None"],
    current_medications: ["Oral rehydration salts (ORS)"],
    treatment_plan: {
      title: "Stomach Bug Recovery Plan",
      weekly_schedule: [
        { day: "Daily", focus: "ORS + Hydration", duration: "Every 4 hours as needed" },
        { day: "Daily", focus: "Rest and symptom tracking", duration: "Ongoing" },
      ],
      description:
        "Supportive care for viral gastroenteritis including fluids, rest, and bland foods. Seek medical help if symptoms last longer than 48 hours or include blood.",
    },
    diet_plan: {
      title: "BRAT Diet Adaptation",
      daily_calories: "1,200-1,500 calories (temporary)",
      macros: { protein: "15%", carbs: "70%", fats: "15%" },
      meal_examples: [
        { meal: "Breakfast", example: "Plain toast and applesauce" },
        { meal: "Lunch", example: "Boiled white rice and steamed carrots" },
        { meal: "Dinner", example: "Banana and dry cereal" },
        { meal: "Snacks", example: "Saltine crackers, electrolyte water" },
      ],
      description:
        "Short-term bland diet to ease digestive strain. Emphasizes bananas, rice, applesauce, and toast (BRAT), gradually reintroducing normal foods after symptoms subside.",
    },
  },
];
