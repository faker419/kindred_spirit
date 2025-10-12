"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface PermanentContactModalProps {
  isOpen: boolean
  onClose: () => void
  contactName: string
  onConfirm: () => void
  isCurrentUserAtLimit?: boolean
  isOtherUserAtLimit?: boolean
}

export function PermanentContactModal({
  isOpen,
  onClose,
  contactName,
  onConfirm,
  isCurrentUserAtLimit,
  isOtherUserAtLimit,
}: PermanentContactModalProps) {
  const isAtLimit = isCurrentUserAtLimit || isOtherUserAtLimit
  const limitMessage =
    isCurrentUserAtLimit && isOtherUserAtLimit
      ? `Both you and ${contactName} have reached the limit of 5 permanent contacts. One of you will need to remove an existing contact first.`
      : isCurrentUserAtLimit
        ? `You've reached your limit of 5 permanent contacts. To add ${contactName}, you'll need to remove an existing contact first.`
        : `${contactName} has reached their limit of 5 permanent contacts. They'll need to remove an existing contact before accepting new requests.`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
          </div>
          <DialogTitle className="text-center">
            {isAtLimit ? "Contact Limit Reached" : "Request Permanent Contact"}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {isAtLimit ? (
              limitMessage
            ) : (
              <>
                Send a request to make <span className="font-semibold text-foreground">{contactName}</span> one of your
                5 permanent contacts? They'll be notified and can accept or decline.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl bg-transparent">
            {isAtLimit ? "Close" : "Cancel"}
          </Button>
          {!isAtLimit && (
            <Button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1 rounded-xl"
            >
              Send Request
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
