/**
 * demo-data.js
 * Seeds localStorage with Nonesi Lodge demo data on first load,
 * then exposes a DemoData helper for all CRUD operations.
 */

(function () {
  if (!localStorage.getItem('nonesi_seeded')) {
    const rooms = [
      {"id":1,"name":"Double or Twin Room","price":700,"price_unit":"night","sleeps":2,"size_m2":16,"bed_type":"Double/Twin bed","bathroom":"Private bathroom","image":"../images/room-twin.png","active":true,"description":"A comfortable room with flexible bedding options, ideal for couples or friends travelling together."},
      {"id":2,"name":"Deluxe Double Room","price":750,"price_unit":"night","sleeps":2,"size_m2":16,"bed_type":"Double bed","bathroom":"Shower bathroom","image":"../images/gallery-rooms.png","active":true,"description":"An elevated stay with a plush double bed and stylish shower ensuite."},
      {"id":3,"name":"Family Room with Shower","price":850,"price_unit":"night","sleeps":3,"size_m2":20,"bed_type":"3 Single beds","bathroom":"Shower bathroom","image":"../images/room-family-beds.png","active":true,"description":"Spacious family room with three single beds — perfect for a small family or group."},
      {"id":4,"name":"Family Room","price":950,"price_unit":"night","sleeps":4,"size_m2":22,"bed_type":"Double + Twin beds","bathroom":"Private bathroom","image":"../images/room-terrace.png","active":true,"description":"Our largest room, sleeping four with a mix of double and twin beds and a private bathroom."}
    ];

    const inquiries = [
      {"id":1,"guest_name":"Thabo Nkosi","phone":"072 345 6789","email":"","check_in":"2026-12-10","check_out":"2026-12-13","room_pref":"Double or Twin Room","adults":2,"children":0,"status":"new","notes":"","created_at":"2026-11-20T09:14:00Z"},
      {"id":2,"guest_name":"Liezel van der Berg","phone":"083 456 7890","email":"","check_in":"2026-12-15","check_out":"2026-12-17","room_pref":"Family Room","adults":2,"children":2,"status":"contacted","notes":"Called on 21 Nov — awaiting confirmation.","created_at":"2026-11-19T14:30:00Z"},
      {"id":3,"guest_name":"Nomsa Dlamini","phone":"071 234 5678","email":"","check_in":"2027-01-05","check_out":"2027-01-07","room_pref":"Deluxe Double Room","adults":2,"children":0,"status":"confirmed","notes":"Deposit received.","created_at":"2026-11-18T11:00:00Z"},
      {"id":4,"guest_name":"Peter Sithole","phone":"082 567 8901","email":"","check_in":"2026-11-28","check_out":"2026-11-30","room_pref":"Family Room with Shower","adults":3,"children":0,"status":"confirmed","notes":"","created_at":"2026-11-15T08:45:00Z"},
      {"id":5,"guest_name":"Sarah Johnson","phone":"084 678 9012","email":"","check_in":"2026-12-20","check_out":"2026-12-23","room_pref":"Double or Twin Room","adults":2,"children":0,"status":"new","notes":"","created_at":"2026-11-21T16:00:00Z"}
    ];

    const gallery = [
      {"id":1,"src":"../images/about-main.png","caption":"Lodge & Pool","in_mosaic":true,"sort_order":1},
      {"id":2,"src":"../images/gallery-entrance.png","caption":"Arrival","in_mosaic":true,"sort_order":2},
      {"id":3,"src":"../images/gallery-rooms.png","caption":"Guest Rooms","in_mosaic":true,"sort_order":3},
      {"id":4,"src":"../images/gallery-events-actual.png","caption":"Events & Dining","in_mosaic":true,"sort_order":4},
      {"id":5,"src":"../images/gallery-selfcatering.png","caption":"Self-Catering","in_mosaic":true,"sort_order":5},
      {"id":6,"src":"../images/gallery-pool.png","caption":"Garden & Pool","in_mosaic":true,"sort_order":6}
    ];

    const settings = {
      "check_in_time":"14:00",
      "check_out_time":"10:00",
      "phone1":"072 570 3772",
      "phone2":"071 414 7919",
      "email":"nonesilodge@gmail.com",
      "address":"24 Komani Street, Southbourne, Komani (Queenstown), 5320",
      "lodge_name":"Nonesi Lodge",
      "tagline":"B&B & Self-Catering Accommodation in Komani, Queenstown"
    };

    localStorage.setItem('nonesi_rooms',     JSON.stringify(rooms));
    localStorage.setItem('nonesi_inquiries', JSON.stringify(inquiries));
    localStorage.setItem('nonesi_gallery',   JSON.stringify(gallery));
    localStorage.setItem('nonesi_settings',  JSON.stringify(settings));
    localStorage.setItem('nonesi_seeded',    'true');
  }
})();

const DemoData = {
  getRooms()          { return JSON.parse(localStorage.getItem('nonesi_rooms')     || '[]'); },
  saveRooms(arr)      { localStorage.setItem('nonesi_rooms',     JSON.stringify(arr)); },
  getInquiries()      { return JSON.parse(localStorage.getItem('nonesi_inquiries') || '[]'); },
  saveInquiries(arr)  { localStorage.setItem('nonesi_inquiries', JSON.stringify(arr)); },
  getGallery()        { return JSON.parse(localStorage.getItem('nonesi_gallery')   || '[]'); },
  saveGallery(arr)    { localStorage.setItem('nonesi_gallery',   JSON.stringify(arr)); },
  getSettings()       { return JSON.parse(localStorage.getItem('nonesi_settings')  || '{}'); },
  saveSettings(obj)   { localStorage.setItem('nonesi_settings',  JSON.stringify(obj)); },
};
