//
//  createMeeting.swift
//  Letsmeet
//
//  Created by Sahen Rai on 3/4/22.
//

import UIKit
import Alamofire

class createMeeting: UIViewController {

    @IBOutlet weak var startDate: UIDatePicker!
    @IBOutlet weak var endDate: UIDatePicker!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    

    @IBAction func finishMeeting(_ sender: Any) {
        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + UserDefaults.standard.string(forKey: "auth")! ?? "" ?? "",
            "Accept": "application/json"
        ]
        
        
        let parameters: [String: Any] = [
            "meetingStart" :  ISO8601DateFormatter.string(from: startDate.date, timeZone: TimeZone.current, formatOptions: [.withInternetDateTime]),
            "meetingEnd" : ISO8601DateFormatter.string(from: endDate.date, timeZone: TimeZone.current, formatOptions: [.withInternetDateTime]),
            "meetingHost" : UserDefaults.standard.string(forKey: "email")!,
            "duration" : 10,
        ]

        AF.request("http://cs130project-env.eba-zrazja2x.us-east-1.elasticbeanstalk.com/createmeeting", method: .post, parameters: parameters, encoding: URLEncoding.default)
            .responseString { response in
                addMeeting(meetingString: response.value ?? "", host: true)
            }
        
        
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
