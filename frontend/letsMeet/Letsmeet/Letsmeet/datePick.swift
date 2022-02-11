//
//  datePick.swift
//  Letsmeet
//
//  Created by Sahen Rai on 2/11/22.
//

import UIKit
import DatePicker
class datePick: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let datePicker = DatePicker()
        datePicker.setup { (selected, date) in
            if selected, let selectedDate = date {
                print("\(selectedDate)")
            } else {
                print("cancelled")
            }}
        datePicker.display(in: self)
        
  
        // Do any additional setup after loading the view.
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
