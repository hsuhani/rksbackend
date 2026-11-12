
const mongoose = require("mongoose");

const connectDatabase = require("../config/database");
const Service = require("../modules/services/service.model");

const services = [
    {
        category: "Government",
        name: "Government Office Security",
        slug: "government-office-security",
        shortDescription: "Reliable security solutions for government offices, public institutions, and administrative buildings.",
        description: "Reliable security solutions for government offices, public institutions, and administrative buildings.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471221/governmentImg.png",
        displayOrder: 1
    },
    {
        category: "Mall",
        name: "Shopping Mall Security",
        slug: "shopping-mall-security",
        shortDescription: "Reliable security services for retail centers, shopping malls, and commercial complexes.",
        description: "Reliable security services for retail centers, shopping malls, and commercial complexes.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471217/mall_project.png",
        displayOrder: 2
    },
    {
        category: "Hotel",
        name: "Hotel & Hospitality Security",
        slug: "hotel-hospitality-security",
        shortDescription: "Professional security solutions ensuring guest safety and property protection.",
        description: "Professional security solutions ensuring guest safety and property protection.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471178/hotel_project.png",
        displayOrder: 3
    },
    {
        category: "Personal Security",
        name: "Personal Security Services",
        slug: "personal-security-services",
        shortDescription: "Dedicated personal protection services for individuals, families, and VIP clients.",
        description: "Dedicated personal protection services for individuals, families, and VIP clients.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471217/persnol_security_project.png",
        displayOrder: 4
    },
    {
        category: "Residential",
        name: "Residential & Home Security",
        slug: "residential-home-security",
        shortDescription: "Complete home security services to protect families, residences, and gated communities.",
        description: "Complete home security services to protect families, residences, and gated communities.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471210/homeSec.png",
        displayOrder: 5
    },
    {
        category: "School",
        name: "School Security Solutions",
        slug: "school-security-solutions",
        shortDescription: "Comprehensive security services designed to protect students, staff, and educational facilities.",
        description: "Comprehensive security services designed to protect students, staff, and educational facilities.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471200/school_project.png",
        displayOrder: 6
    },
    {
        category: "Event",
        name: "Party & Event Security",
        slug: "party-event-security",
        shortDescription: "Professional security services for weddings, private parties, concerts, and corporate events.",
        description: "Professional security services for weddings, private parties, concerts, and corporate events.",
        image: "https://res.cloudinary.com/aooarb3m/image/upload/f_auto,q_auto,w_900,c_limit/v1789471201/EventSecurity.png",
        displayOrder: 7
    }
];

const seedServices = async () => {
    try {
        await connectDatabase();

        const operations = services.map((service) => ({
            updateOne: {
                filter: { slug: service.slug },
                update: { $set: service },
                upsert: true
            }
        }));

        const result = await Service.bulkWrite(operations);

        console.log("Services seeded successfully");
        console.log("Inserted:", result.upsertedCount);
        console.log("Updated:", result.modifiedCount);

    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

seedServices();
