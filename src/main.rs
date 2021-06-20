#![feature(in_band_lifetimes, proc_macro_hygiene, decl_macro)]

mod interaction;

#[macro_use]
extern crate rocket;
use log::info;
use interaction::Person;
use interaction::{get_record, get_record_str, save_record};
use rocket::http::Header;
use rocket::{Request, Response};
use rocket::fairing::{Fairing, Info, Kind};
use rocket_contrib::serve::StaticFiles;

pub struct CORS;

impl Fairing for CORS {
    fn on_response(&self, request: &Request, response: &mut Response) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Access-Control-Allow-Methods", "POST, GET, PATCH, OPTIONS"));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }

    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response
        }
    }
}


#[get("/submit_data/<name>/<number>/<likes>")]
fn submit_data(name: String, number: String, likes: String) -> String {
    let mut record = get_record();
    let decoded_name = urlencoding::decode(name.as_str()).unwrap();
    let decoded_number = urlencoding::decode(number.as_str()).unwrap();
    let decoded_likes = urlencoding::decode(likes.as_str()).unwrap();

    info!("Data submitted!\n\tname: {}\n\t\n\tnumber: {}\n\tlikes: {}", &decoded_name, &decoded_number, &decoded_likes);

    record.people.push(Person {
        name: decoded_name,
        number: decoded_number,
        likes: serde_json::from_str::<Vec<String>>(
            &decoded_likes
        ).unwrap(),
    });

    save_record(get_record_str(&record)); 

    r#"{"status": "ok"}"#.to_owned()
}

#[get("/get_data")]
fn get_data() -> String {
    let mut data = r#"{"everyone":"#.to_owned();
    data = data + std::fs::read_to_string("students.json").unwrap().as_str();
    data = data + r#", "currently":"#;
    data = data + get_record_str(&get_record()).to_string().as_str();
    data = data + "}";

    data
}

fn main() {
    rocket::ignite().attach(CORS)
        .mount("/", routes![get_data, submit_data])
        .mount("/", StaticFiles::from("docs")).launch();
}
