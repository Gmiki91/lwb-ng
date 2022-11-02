import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Topic } from 'src/app/shared/models/topic';
import { TopicService } from 'src/app/shared/services/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {
  grade!:number;
  subject!: string;
  constructor(private topicService: TopicService,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.grade = params['grade']);
   }

  onSave(form: NgForm): void {
    if (form.valid) {
      const { text, lesson } = form.controls;
      const topic: Topic = {
        text: text.value,
        lesson: lesson.value,
        grade: this.grade,
        subject: this.subject
      }
      this.topicService.addTopic(topic);
    }
  }
  changedSubject(subject: string): void {
    if (subject !== this.subject) {
      this.subject = subject;
      this.topicService.requestTopics(this.subject,this.grade);
    }
  }

}
