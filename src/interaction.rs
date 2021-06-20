use serde::{Serialize, Deserialize};
use std::io::Write;

#[derive(Serialize, Deserialize)]
pub struct Record {
    pub people: Vec<Person>,
}

#[derive(Serialize, Deserialize)]
pub struct Person {
    pub name: String,
    pub number: String,
    pub likes: Vec<String>,
}

pub fn get_record_str(record: &Record) -> String {
    serde_json::to_string(record).unwrap()
}

pub fn get_record() -> Record {
    serde_json::from_str(std::fs::read_to_string("database.json").unwrap().as_str()).unwrap()
}

pub fn save_record(record: String) {
    let mut record_file = std::fs::File::create("database.json").unwrap();
    record_file.write_all(record.as_bytes()).unwrap(); // Write the data we need
}

