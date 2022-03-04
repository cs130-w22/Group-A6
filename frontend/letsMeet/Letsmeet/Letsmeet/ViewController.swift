//
//  ViewController.swift
//  Letsmeet
//
//  Created by Sahen Rai on 2/8/22.
//

import UIKit
import GoogleSignIn
import GoogleAPIClientForREST
import Alamofire
import SwiftyJSON


class ViewController: UIViewController{

    @IBOutlet weak var signinButton: GIDSignInButton!
    override func viewDidLoad() {
        super.viewDidLoad()
        
      
    }
    
   
    @IBAction func tappedButton(_ sender: Any) {
        
        let signInConfig = GIDConfiguration.init(clientID: "1059961823764-19gg2rhts4140lsn47pbql35gnaibll3.apps.googleusercontent.com")

        
        
        
        GIDSignIn.sharedInstance.signIn(
           with: signInConfig,
           presenting: self
       ) { user, error in
           guard error == nil else { return }
           guard let user = user else { return }
           
           
           
           UserDefaults.standard.set(user.authentication.accessToken, forKey: "auth")
           
         

       }
        
    }
    
    

    @IBAction func calendarAdd(_ sender: Any) {
        
        let additionalScopes = ["https://www.googleapis.com/auth/calendar"]

        
        let headers: HTTPHeaders = [
            "Authorization": "Bearer " + UserDefaults.standard.string(forKey: "auth")! ?? "" ?? "",
            "Accept": "application/json"
        ]
        

        AF.request("https://www.googleapis.com/calendar/v3/calendars/primary/events", headers: headers).responseJSON { response in
            print(response.value)
            switch response.result {
                case .success(let value):
                
                do {
                    let events = try JSONDecoder().decode(Events.self, from: response.data!)
                    let encoder = JSONEncoder()
                    
                    if let encoded = try? encoder.encode(events) {
                        let defaults = UserDefaults.standard
                        defaults.set(encoded, forKey: "events")
                        self.nextButton.isEnabled = true
                    }
                } catch(let error) {
                  print(error)
                }

                case .failure(let error):
                    print(error)
                }
        }
        
        
        GIDSignIn.sharedInstance.addScopes(additionalScopes, presenting: self) { user, error in
            guard error == nil else { return }
            print(error)
            guard let user = user else { return }
            

            let headers: HTTPHeaders = [
             "Authorization": "Bearer " + user.authentication.accessToken,
                "Accept": "application/json"
            ]
            

            AF.request("https://www.googleapis.com/calendar/v3/calendars/primary/events", headers: headers).responseJSON { response in
                print(response.result)
                switch response.result {
                    case .success(let value):
                    
                    do {
                        let events = try JSONDecoder().decode(Events.self, from: response.data!)
                        print(events.items)
 
                    } catch(let error) {
                      print(error)
                    }

                    case .failure(let error):
                        print(error)
                    }
            }
                    }
        
        

    }
    @IBOutlet weak var nextButton: UIButton!
}

