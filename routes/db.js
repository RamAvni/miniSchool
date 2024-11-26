const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const fsPromise = require("fs/promises");
const path = require("path");

const { con } = require("con");

async function initializeDatabase() {
    enterDataBase();
}

function enterDataBase() {
    con.query("USE miniSchool", (err) => {
        if (err && err.code === "ER_BAD_DB_ERROR") {
            // Create mini school, and enter it.
            con.query("CREATE DATABASE miniSchool", (err, result) => {
                if (err) throw err;
                console.log("Created miniSchool", result);
            });
            con.changeUser({ database: "miniSchool" });
            createTables();
        } else if (err) {
            throw err;
        } else {
            console.log("Connected to miniSchool!");
        }
    });
}

async function createTables() {
    try {
        const files = await fsPromise.readdir(__dirname + "/../entities");

        await Promise.all(
            files.map(async (file) => {
                const fileName = file.replace(".json", "");
                let sqlQuery = `CREATE TABLE ${fileName} ( `;
                const fileData = await fsPromise.readFile(path.join(__dirname, `/../entities/${file}`), "utf-8");
                console.log("fileData: ", fileData);
                for (let key in JSON.parse(fileData)) {
                    sqlQuery += `${key} ${JSON.parse(fileData)[key]}, `;
                } // JsonifyTables();
                sqlQuery = sqlQuery.substring(0, sqlQuery.length - 2); //Remove last space and comma
                sqlQuery += ")";

                con.query(sqlQuery, (err) => {
                    if (err) throw err;
                });
            })
        );
        con.query("INSERT INTO admin (name, password, school_id) VALUES ('Ram', 213, 1), ('La', 645, 2)", (err) => {
            if (err) throw err;
        });
    } catch (e) {
        throw e;
    }
}

// function createDefaultTables() {
//     const schoolTable = "CREATE TABLE school (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), school_code INT)";
//     const classroomTable =
//         "CREATE TABLE classroom (id INT AUTO_INCREMENT PRIMARY KEY, grade VARCHAR(255), classroom_index INT, teacher_id INT, school_id INT)";
//     const teacherTable = "CREATE TABLE teacher (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password INT, email VARCHAR(255))";
//     const studentTable = "CREATE TABLE student (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password INT, classroom_id INT)";
//     const adminTable = "CREATE TABLE admin (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), password INT, school_id INT)";

//     con.query(schoolTable, (err) => {
//         if (err) throw err;
//     });

//     con.query(studentTable, (err) => {
//         if (err) throw err;
//     });

//     con.query(teacherTable, (err) => {
//         if (err) throw err;
//     });

//     con.query(adminTable, (err) => {
//         if (err) throw err;
//     });

//     con.query(classroomTable, (err) => {
//         if (err) throw err;
//     });
// }

// function fillDefaultTables() {
//     const schoolInfo = "INSERT INTO school (name, school_code) VALUES ('Bet Yaakov', 666), ('Shaar HaNegev', 123)";
//     const classroomInfo =
//         "INSERT INTO classroom (grade, classroom_index, teacher_id, school_id) VALUES ('A', 1, 1, 1), ('A', 2, 2, 1), ('A', 1, 3, 2), ('B', 1, 4, 2)";
//     const teacherInfo =
//         "INSERT INTO teacher (name, password, email) VALUES ('Rotem Ton', 123, 'rotemton@hilma.tech'), ('Chen Orenstein', 456, 'chenorenstein@hilma.tech'), ('Tohar Rahima', 789, 'toharrahima@hilma.tech'), ('Dor Greenwald', 101, 'dorgreenwald@hilma.tech')";
//     const adminInfo = "INSERT INTO admin (name, password, school_id) VALUES ('Danit', 555, 1), ('Shimi', 777, 2)";
//     const students =
//         "INSERT INTO student (name, password, classroom_id) VALUES ('Shir', 765, 1), ('Naama', 432, 2), ('Talya', 987, 3), ('Ori', 111, 4)";

//     con.query(schoolInfo, (err) => {
//         if (err) throw err;
//     });

//     con.query(classroomInfo, (err) => {
//         if (err) throw err;
//     });

//     con.query(teacherInfo, (err) => {
//         if (err) throw err;
//     });

//     con.query(adminInfo, (err) => {
//         if (err) throw err;
//     });

//     con.query(students, (err) => {
//         if (err) throw err;
//     });
// }

// async function JsonifyTables() {
//     const tablesArr = [];
//     con.query("SHOW TABLES", (err, result) => {
//         if (err) throw err;
//         result.forEach((tableData) => {
//             tablesArr.push(tableData["Tables_in_miniSchool"]);
//         });
//         console.log("finished query");
//     });
//     // Get tables into an arr v/
//     // ForEach table: 1. Create JSON file 2. Post table info into file
//     console.log(tablesArr);
//     // tablesArr.forEach((table) => {
//     //     fs.writeFile(`${table}.json`);
//     // }&{});
// }

initializeDatabase();
