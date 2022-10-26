import { OnInit, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topicList$!: Observable<Topic[]>

  @Input() parentMode = false;
  @Input() set info(obj: { subject: string, grade: number } | null) {
    if (obj)
      this.topicService.requestTopics(obj.subject, obj.grade);
  };

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicList$ = this.topicService.getTopics();
  }
  formatDate(date: number): string {
    return format(new Date(date), 'yyyy/MM/dd');
  }


  onDelete(topic: Topic): void {
      this.topicService.deleteTopic(topic);
  
  }
}
