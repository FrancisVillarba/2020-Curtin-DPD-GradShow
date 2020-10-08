import Swup from 'swup';
import { Student } from './Components/StudentListing.js';
const swup = new Swup();

// Entry Point for JS
console.log("Hello World")


// Generate Major Buttons 
Student.generateStudentListing();

// Generate Student Profiles
Student.createMajors();