//
//  functions.swift
//  Letsmeet
//
//  Created by Sahen Rai on 3/4/22.
//

import Foundation
import Alamofire



public func addMeeting(meetingString: String, host: Bool){
    
    let defaults = UserDefaults.standard
    
    var tempMeetings = [String:Bool]()
    
    if(UserDefaults.standard.object(forKey: "meetings") as? [String:Bool] != nil){
        
         tempMeetings  = (UserDefaults.standard.object(forKey: "meetings") as? [String:Bool])!
        
    }
    else
    {
        
         tempMeetings  = ["Sahen": true]
        
     
        
    }
    
    if(!tempMeetings.keys.contains(meetingString)){
        
        tempMeetings[meetingString] = host
        
    }
    

    
    defaults.set(tempMeetings, forKey: "meetings")
    
    
    
    
    
}


public func updateMeeting(meetingID: String){
    

    let headers: HTTPHeaders = [
        "Accept": "application/json"
    ]


    let parameters: [String: Any] = [
        "meetingConflict" :  getIntervals(),
        "attendee" : UserDefaults.standard.string(forKey: "email")!,
        "meetingId" : meetingID,
    ]

    AF.request("http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/updatemeeting", method: .post, parameters: parameters, encoding: URLEncoding.default)
        .responseString { response in
            addMeeting(meetingString: response.value ?? "", host: true)
         
            
            print(response.value)
        }

    
}


public func getIntervals()-> [[String]]{
    var eventArr = [[String]]()
    if let events = UserDefaults.standard.object(forKey: "events") as? Data {
        let decoder = JSONDecoder()
        if let loadedEvents = try? decoder.decode(Events.self, from: events) {
            if(loadedEvents.items != nil){
            for event in loadedEvents.items!{
                eventArr.append([event.start?.dateTime ?? "", event.end?.dateTime ?? ""])
            }
            }
            
        }
    }
    print(eventArr)
    return eventArr

}

func json(from object:Any) -> String? {
    guard let data = try? JSONSerialization.data(withJSONObject: object, options: []) else {
        return nil
    }
    return String(data: data, encoding: String.Encoding.utf8)
}


 public func getMeetingInfo(meetingID: String) -> MeetingInfo{
     
     var tempMeetingInf = MeetingInfo()
    
     let defaults  = UserDefaults.standard
     
    let headers: HTTPHeaders = [
        "Authorization": "Bearer " + UserDefaults.standard.string(forKey: "auth")! ?? "" ?? "",
        "Accept": "application/json"
    ]


    let parameters: [String: Any] = [
        "meetingId" :  meetingID,
    ]
     
     

    AF.request("http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/getmeetinginfo", method: .post, parameters: parameters, encoding: URLEncoding.default)
        .responseJSON{ response in
            
            print(response.result)
            
            switch response.result {
                case .success(let value):
                
                do {
                    tempMeetingInf = try JSONDecoder().decode(MeetingInfo.self, from: response.data!)
                            
                   
                    
                } catch(let error) {
                  print(error)
                }

                case .failure(let error):
                    print(error)
                }
        }
     
     
     return tempMeetingInf
     
    }




    
public func finalizeMeeting(meetingID: String){
    
  
   
    let headers: HTTPHeaders = [
        "Accept": "application/json"
    ]


    let parameters: [String: Any] = [
        "meetingId" : meetingID,
    ]

    AF.request("http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/createmeetingevent", method: .post, parameters: parameters, encoding: URLEncoding.default)
        .responseString { response in
            addMeeting(meetingString: response.value ?? "", host: true)
         
            
            switch response.result {
                case .success(let value):
                
                do {
                  var  tempMeetingInf = try JSONDecoder().decode(CreatedMeeting.self, from: response.data!)
                            
                    addtoGcal(meetingID: meetingID,finalMeeting: tempMeetingInf )
                    
                } catch(let error) {
                  print(error)
                }

                case .failure(let error):
                    print(error)
                }        }

    
}

public func addtoGcal(meetingID: String,finalMeeting: CreatedMeeting){
    
    

    
    
    var startD = DateVal()
    
    var endD = DateVal()

    startD.dateTime = "2021-03-04T17:35:00-08:00"
    endD.dateTime = "2021-03-04T17:35:00-12:00"
    let parameters: [String: [String:String]] = [
        "start" :  [
            "dateTime": "2021-03-04T17:35:00-04:00"
        ],
        "end" :  [
            "dateTime": "2021-03-04T17:35:00-08:00"
        ]
        
        
    ]
     
    print(finalMeeting.optimalTime?[0][0])
    print(finalMeeting.optimalTime?[0][1])

    let headers: HTTPHeaders = [
        "Authorization": "Bearer " + UserDefaults.standard.string(forKey: "auth")! ?? "" ?? "",
        "Accept": "application/json"
    ]
    
    let test = ""

    let request = AF.request("https://www.googleapis.com/calendar/v3/calendars/primary/events", method:.post, parameters: parameters, encoder: JSONParameterEncoder.default, headers: headers).responseJSON { response in
        switch response.result {
            case .success(let value):
            
            print(NSString(data: (response.request?.httpBody)!, encoding: String.Encoding.utf8.rawValue))

 
            case .failure(let error):
     
            print(error)
 
            
            }        }
        
        
    
    
  
}
