import * as React from "react"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface MonthYearPickerProps {
  date?: Date
  onDateChange: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  allowPresent?: boolean
  isPresent?: boolean
  onPresentChange?: (isPresent: boolean) => void
}

export function MonthYearPicker({
  date,
  onDateChange,
  placeholder = "Select month and year",
  disabled = false,
  className,
  allowPresent = false,
  isPresent = false,
  onPresentChange
}: MonthYearPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedMonth, setSelectedMonth] = React.useState<number>(date?.getMonth() || new Date().getMonth())
  const [selectedYear, setSelectedYear] = React.useState<number>(date?.getFullYear() || new Date().getFullYear())
  const [localIsPresent, setLocalIsPresent] = React.useState<boolean>(isPresent)
  
  // Generate unique ID for this component instance
  const uniqueId = React.useId()

  // Sync local state with props when they change
  React.useEffect(() => {
    setLocalIsPresent(isPresent)
  }, [isPresent])

  React.useEffect(() => {
    if (date) {
      setSelectedMonth(date.getMonth())
      setSelectedYear(date.getFullYear())
    }
  }, [date])

  const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" }
  ]

  // Generate years from 1960 to 10 years in the future
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1960 + 11 }, (_, i) => currentYear + 10 - i)

  const handleConfirm = () => {
    if (localIsPresent && onPresentChange) {
      onPresentChange(true)
      onDateChange(undefined)
    } else {
      if (onPresentChange) {
        onPresentChange(false)
      }
      const newDate = new Date(selectedYear, selectedMonth, 1)
      onDateChange(newDate)
    }
    setOpen(false)
  }

  const handlePresentToggle = () => {
    const newPresentState = !localIsPresent
    setLocalIsPresent(newPresentState)
  }

  const formatDisplayValue = () => {
    if (isPresent) return "Present"
    if (!date) return placeholder
    return format(date, "MMM yyyy")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && !isPresent && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDisplayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium mb-2 block">Month</label>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(parseInt(value))}
                disabled={localIsPresent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Year</label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(parseInt(value))}
                disabled={localIsPresent}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {allowPresent && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`present-${uniqueId}`}
                checked={localIsPresent}
                onChange={handlePresentToggle}
                className="rounded border-gray-300"
              />
              <label htmlFor={`present-${uniqueId}`} className="text-sm font-medium">
                Present / Current
              </label>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}