//
//  meetingsViewTableViewController.swift
//  Letsmeet
//
//  Created by Sahen Rai on 3/3/22.
//

import UIKit
import Floaty
import CleanyModal

import MessageUI

class meetingsViewTableViewController: UITableViewController {

    var meetings = [String:Bool]()
    var meetingInfo = [String: MeetingInfo]()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        getIntervals()
        if(UserDefaults.standard.object(forKey: "meetings") as? [String:Bool] != nil){
            
            meetings  = (UserDefaults.standard.object(forKey: "meetings") as? [String:Bool])!
            
        }

        let floaty = Floaty()
      
 
        floaty.addItem(title: "Create Meeting", handler: { item in
            self.performSegue(withIdentifier: "host", sender: self)
        })
        
        floaty.addItem(title: "Join Meeting", handler: { item in
            self.performSegue(withIdentifier: "guest", sender: self)
        })
        
        floaty.friendlyTap = true
        floaty.sticky = true
       
        self.view.addSubview(floaty)
        
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        
        var meetingVals = Array(meetings.keys)
        
        var curMeetingInfo  = meetingInfo[meetingVals[indexPath.row]]
        

        
        getMeetingInfo(meetingID:  meetingVals[indexPath.row])
        
        let alert = CleanyAlertViewController(
            title: "Meeting " + meetingVals[indexPath.row],
            message: "Host: " + ((curMeetingInfo?.meetingHost) ?? "") ?? "",
            imageName: "warning_icon")

        alert.addAction(title: "Add Meeting Conflicts", style: CleanyAlertAction.Style.default, handler: {_ in
            
            updateMeeting(meetingID: meetingVals[indexPath.row])
            
        })
        alert.addAction(title: "Add to Google calendar", style: CleanyAlertAction.Style.default, handler: {_ in
            
            finalizeMeeting(meetingID: meetingVals[indexPath.row])
            
            let newAlert = CleanyAlertViewController(
                title: "Meeting Added to Google calendar!",
                message: "Thank you for adding a meeting!")
            
            newAlert.addAction(title: "Ok", style: .cancel)
            self.present(newAlert, animated: true, completion: nil)

            
        })
        alert.addAction(title: "Share Meeting", style: CleanyAlertAction.Style.default, handler: {_ in
            
            // text to share
              
                   
                   // set up activity view controller
                   let textToShare = [ meetingVals[indexPath.row] ]
                   let activityViewController = UIActivityViewController(activityItems: textToShare, applicationActivities: nil)
                   activityViewController.popoverPresentationController?.sourceView = self.view // so that iPads won't crash
                
                   // present the view controller
                   self.present(activityViewController, animated: true, completion: nil)
        })
        alert.addAction(title: "Cancel", style: .cancel)

        present(alert, animated: true, completion: nil)
    }
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    
            
        return meetings.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "right", for: indexPath)
      
        var meetingVals = Array(meetings.keys)
        
        meetingInfo[meetingVals[indexPath.row]] = getMeetingInfo(meetingID: meetingVals[indexPath.row])
        
        cell.textLabel?.text =  (meetings[meetingVals[indexPath.row]]! ? "👑 " : "👤 ") + meetingVals[indexPath.row]
        cell.detailTextLabel?.text = (meetingInfo[meetingVals[indexPath.row]]?.meetingCreated ?? false ? "🔒" : "🔓")
        
        return cell
    }
    

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCell.EditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
