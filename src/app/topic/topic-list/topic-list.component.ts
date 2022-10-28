import { OnInit, Component, Input } from '@angular/core';
import { format } from 'date-fns';
import { Observable,tap } from 'rxjs';
import { Topic } from '../../shared/models/topic';
import { TopicService } from '../../shared/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topicList$!: Observable<Topic[]>
  emptyList=true;
  @Input() subject!:string;
  @Input() grade!:number;

  constructor(private topicService: TopicService) { }

  ngOnInit(): void {
    this.topicList$ = this.topicService.getTopics().pipe(tap((list) => this.emptyList = list.length===0));
  }
  formatDate(date: number): string {
    return format(new Date(date), 'yyyy/MM/dd');
  }
  onDelete(topic: Topic): void {
      this.topicService.deleteTopic(topic);
  
  }
}
