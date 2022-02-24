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
           
           
           
    
           
         

       }
        
    }
    
    

    @IBAction func calendarAdd(_ sender: Any) {
        
        let additionalScopes = ["https://www.googleapis.com/auth/calendar"]

        
        GIDSignIn.sharedInstance.addScopes(additionalScopes, presenting: self) { user, error in
            guard error == nil else { return }
            guard let user = user else { return }

            let headers: HTTPHeaders = [
             "Authorization": "Bearer " + user.authentication.accessToken,
                "Accept": "application/json"
            ]
            

            AF.request("https://www.googleapis.com/calendar/v3/calendars/primary/events", headers: headers).responseString { response in
                debugPrint(response)
                print(response.value)
                print(response.data)
            }
                    }
        
        

    }
}

