//
//  waitingScreen.swift
//  Letsmeet
//
//  Created by Sahen Rai on 2/11/22.
//

import UIKit
import NVActivityIndicatorView
class waitingScreen: UIViewController {

    @IBOutlet weak var animate: NVActivityIndicatorView!
    override func viewDidLoad() {
        super.viewDidLoad()
        animate.color = UIColor.purple
        animate.type = NVActivityIndicatorType.ballRotateChase
        animate.startAnimating()
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
