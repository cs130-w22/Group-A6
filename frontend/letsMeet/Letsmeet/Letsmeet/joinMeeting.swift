//
//  joinMeeting.swift
//  Letsmeet
//
//  Created by Sahen Rai on 3/4/22.
//

import UIKit

class joinMeeting: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    @IBOutlet weak var joinField: UITextField!
    
    @IBAction func join(_ sender: Any) {
        
        addMeeting(meetingString: joinField.text ?? "", host: false)
        
    updateMeeting(meetingID:  joinField.text ?? "")
        
    }
    

}
