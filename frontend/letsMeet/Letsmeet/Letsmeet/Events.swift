// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let events = try? newJSONDecoder().decode(Events.self, from: jsonData)

import Foundation

// MARK: - Events
struct Events: Codable {
    let defaultReminders: [DefaultReminder?]
    let items: [Item]?
    let timeZone, accessRole, nextSyncToken, etag: String?
    let updated, kind, summary: String?
}

// MARK: - DefaultReminder
struct DefaultReminder: Codable {
    let method: String?
    let minutes: Int?
}

// MARK: - Item
struct Item: Codable {
    let status, summary: String?
    let end: DateVal?
    let eventType: String?
    let htmlLink: String?
    let organizer: Creator?
    let sequence: Int?
    let itemDescription, location:String?
    let iCalUID, created: String?
    let etag: String?
    let reminders: Reminders?
    let updated, id: String?
    let start: DateVal?
    let creator: Creator?
    let kind: String?

    enum CodingKeys: String, CodingKey {
        case status, summary, end, eventType, htmlLink, organizer, sequence, itemDescription
        case iCalUID, created, location, etag, reminders, updated, id, start, creator, kind
    }
}

// MARK: - Creator
struct Creator: Codable {
    let creatorSelf: Bool?
    let email: String?

}

// MARK: - End
struct DateVal: Codable {
    let timeZone: String?
    let dateTime: String?
}

// MARK: - Reminders
struct Reminders: Codable {
    let useDefault: Bool?
}
